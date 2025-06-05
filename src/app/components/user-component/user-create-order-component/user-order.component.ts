import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailDTO } from 'src/app/dtos/OrderDetailDTO';
import { OrderDTO } from 'src/app/dtos/OrderDTO';
import { CartItemsResponse } from 'src/app/responses/CartItemResponse';
import { OrderResponse } from 'src/app/responses/OrderResponse';
import { UserResponse } from 'src/app/responses/UserResponse';
import { CartItemService } from 'src/app/services/CartItemService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { OrderDetailService } from 'src/app/services/OrderDetailService';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {
  userResponse?: UserResponse;
  sellerId: number = 0;
  shippingAddres: string = "";
  totalAmount: number = 0;
  notes: string = "";
  selectCartItemsIds: number[] = [];
  selectCartItems: CartItemsResponse[] = [];
  orderId: number = 0;
  message: string = "";

  constructor(
    private localStorageService: LocalStorageService,
    private cartItemService: CartItemService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserResponse();
    this.getSelectCartItems();
  }

  getUserResponse() {
    this.userResponse = this.localStorageService.getUserResponseFromLocalStorage();
  }

  getSelectCartItems() {
    const storedData = this.localStorageService.getCartItemsFromLocalStorage();
    this.selectCartItemsIds = storedData ? JSON.parse(storedData) : [];
    this.cartItemService.getCartItemByIds(this.selectCartItemsIds).subscribe({
      next: (response: any) => {
        debugger
        this.selectCartItems = response;
        this.selectCartItems.forEach((cartItem: CartItemsResponse) => {
          this.totalAmount += cartItem.product.price * cartItem.quantity;
        });
      }, 
      complete: () => {
        this.sellerId = this.selectCartItems[0].product.seller_respone.id;
      }, 
      error(error: any) {
        alert(error.error);
      },
    })
  }

  submitOrder() {
    if (this.userResponse) {
      debugger
      const orderDTO: OrderDTO = {
        "user_id": this.userResponse.id,
        "seller_id": this.sellerId,
        "shipping_addres": this.shippingAddres,
        "total_amount": this.totalAmount,
        "notes": this.notes
      }
      this.orderService.createOrder(orderDTO).subscribe({
        next: (response: any) => {
          debugger
          this.orderId = response.order_id;
          this.createOrderDetail();
        }, error(err) {
          alert(err);
        },
      })
    }
  }

  createOrderDetail() {
    this.selectCartItems.forEach((cartItem: CartItemsResponse) => {
      const orderDetailDTO: OrderDetailDTO = {
        "orderId": this.orderId,
        "productId": cartItem.product.product_response_id,
        "numberOfProducts": cartItem.quantity,
        "totalMoney": cartItem.product.price * cartItem.quantity
      }
      debugger
      this.orderDetailService.createOrderDetail(orderDetailDTO).subscribe({
        next: (response: any) => {
          debugger
          this.message = response.message;
        }, error(err) {
          alert(err)
        },
      })
    });
    alert(`${this.message}`);
    this.router.navigate(['user/order-by-user-id/', this.userResponse?.id]);
  }
}
