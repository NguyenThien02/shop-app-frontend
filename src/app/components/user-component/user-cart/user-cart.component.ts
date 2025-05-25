import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemsResponse } from 'src/app/responses/CartItemResponse';
import { CartItemService } from 'src/app/services/CartItemService';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  cartId: number = 0;
  page: number = 0;
  limit: number = 10;
  cartItems: CartItemsResponse[] = [];
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartItemService: CartItemService
  ) { }

  ngOnInit(): void {
    this.getCartId();
    this.getAllCartItemByCartId(this.page, this.limit);
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

  getAllCartItemByCartId(page: number, limit:number) {
    debugger
    this.cartItemService.getAllCartItemByCartId(this.cartId, this.page, this.limit).subscribe({
      next: (response: any) => {
        debugger
        this.cartItems = response.cartItemResponseList;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      }, error(err) {
        console.error(err);
      },
    })
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getAllCartItemByCartId(this.page, this.limit);
    }
  }
}
