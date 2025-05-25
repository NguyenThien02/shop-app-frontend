import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartDTO } from 'src/app/dtos/CartDTO';
import { CartItemsDTO } from 'src/app/dtos/CartItemsDTO';
import { environment } from 'src/app/environment/environment';
import { ProductResponse } from 'src/app/responses/ProductResponse';
import { CartItemService } from 'src/app/services/CartItemService';
import { CartService } from 'src/app/services/CartService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  product: ProductResponse | undefined;
  quantity: number = 1;
  cartId: number | null = null;
  userId: number = 0;
  cartItemsDTO?: CartItemsDTO;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private cartItemService : CartItemService
  ) { }

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetail();
    this.getUserId();
  }

  getProductId() {
    const productIdParam = this.route.snapshot.paramMap.get('product-id');
    if (productIdParam !== null) {
      const productId = +productIdParam;
      this.productId = productId;
    } else {
      console.warn('Not found Product ID');
    }
  }

  getUserId() {
    this.userId = this.localStorageService.getUserResponseFromLocalStorage().id;
  }

  getProductDetail() {
    debugger
    this.productService.getProductDetail(this.productId).subscribe({
      next: (response: any) => {
        debugger
        response.image_url = `${environment.apiBaseUrl}/products/image-product/${response.image_url}`;
        this.product = response;
      }, error(err) {
        console.error(err);
      },
    })
  }

  addToCartItem() {
    debugger
    this.cartId = this.localStorageService.getCartFromLocalStorage();
    if (this.cartId) {
      const cartItemsDTO: CartItemsDTO = {
        "cart_id": this.cartId,
        "product_id": this.productId,
        "quantity" : this.quantity
      }
      this.cartItemService.createCartItem(cartItemsDTO).subscribe ({
        next : (response : any) => {
          debugger
          alert("cart created successfully");
        }, error(err) {
            console.error(err);
        },
      })
    }

  }

  buyNow() {

  }
}
