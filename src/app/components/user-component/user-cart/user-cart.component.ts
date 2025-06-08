import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemsResponse } from 'src/app/responses/CartItemResponse';
import { ProductResponse } from 'src/app/responses/ProductResponse';
import { CartItemService } from 'src/app/services/CartItemService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent implements OnInit {
  cartId: number = 0;
  page: number = 0;
  limit: number = 10;
  cartItems: CartItemsResponse[] = [];
  totalPages: number = 0;
  pages: number[] = [];

  selectCartItems: CartItemsResponse[] = [];
  selectCartItemsIds: number[] = [];
  totalAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cartItemService: CartItemService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getCartId();
    this.getAllCartItemByCartId(this.page, this.limit);
    this.getSelectCartItems();
  }

  getCartId() {
    const cartIdParam = this.route.snapshot.paramMap.get('cart-id');
    if (cartIdParam !== null) {
      const cartId = +cartIdParam;
      this.cartId = cartId;
    } else {
      console.warn('Not found cart ID');
    }
  }

  getAllCartItemByCartId(page: number, limit: number) {
    this.cartItemService
      .getAllCartItemByCartId(this.cartId, this.page, this.limit)
      .subscribe({
        next: (response: any) => {
          debugger;
          this.cartItems = response.cartItemResponseList;
          this.totalPages = response.totalPages;
          this.pages = Array(this.totalPages)
            .fill(0)
            .map((x, i) => i);
        },
        error(err) {
          console.error(err);
        },
      });
  }

  deleteCartItemById(cartItemId: number) {
    const confirmed = confirm('Bạn có chắc muốn xóa cart items này không!');
    if (confirmed) {
      this.cartItemService.deleteCartItemById(cartItemId).subscribe({
        next: (response: any) => {
          debugger;
          alert(response.message);
          window.location.reload();
        },
        error: (error: Error) => {
          alert(error);
        },
      });
    }
  }

  addCartItems(selectCartItemId: number, selectSellerId: number) {
    debugger;
    if (this.selectCartItemsIds.includes(selectCartItemId)) {
      alert('Sản phẩm đã có trong đơn đặt hàng');
      return;
    }
    const isSellerExist = this.selectCartItems.some(
      (item) => item.product.seller_respone.id !== selectSellerId
    );
    if (isSellerExist && Array.isArray(this.selectCartItems)) {
      debugger;
      alert('Vui lòng chọn đúng người bán trong đơn hàng đã chọn');
      return;
    }
    this.selectCartItemsIds.push(selectCartItemId);
    this.localStorageService.setCartItemsToLocalStorage(
      this.selectCartItemsIds
    );
    alert('Thêm sản phẩm vào đơn hàng thành công');
    this.getSelectCartItems();
  }

  getSelectCartItems() {
    const storedData = this.localStorageService.getCartItemsFromLocalStorage();
    this.selectCartItemsIds = storedData ? JSON.parse(storedData) : [];
    this.cartItemService.getCartItemByIds(this.selectCartItemsIds).subscribe({
      next: (response: any) => {
        debugger;
        this.selectCartItems = response;
        this.selectCartItems.forEach((cartItem: CartItemsResponse) => {
          this.totalAmount += cartItem.product.price * cartItem.quantity;
        });
      },
      error(err) {
        alert(err);
      },
    });
  }

  deleteSelectCartItemById(selectCartItemId: number) {
    const storedData = this.localStorageService.getCartItemsFromLocalStorage();
    this.selectCartItemsIds = storedData ? JSON.parse(storedData) : [];

    this.selectCartItemsIds = this.selectCartItemsIds.filter(
      (id) => id != selectCartItemId
    );
    this.localStorageService.setCartItemsToLocalStorage(
      this.selectCartItemsIds
    );

    this.getSelectCartItems();
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getAllCartItemByCartId(this.page, this.limit);
    }
  }
}
