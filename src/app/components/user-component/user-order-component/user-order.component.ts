import { Component, OnInit } from '@angular/core';
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
  shippingAddres: string = "";
  totalAmount: number = 0;
  notes: string = "";
  selectCartItemsIds: number[] = [];
  selectCartItems: CartItemsResponse[] = [];
  orderId: number = 0;
  Success: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private cartItemService: CartItemService,
    private orderService: OrderService,
    private orderDetailService : OrderDetailService
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
      }, error(err) {
        alert(err);
      },
    })
  }

  submitOrder() {
    if (this.userResponse) {
      debugger
      const orderDTO: OrderDTO = {
        "user_id": this.userResponse.id,
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
        "totalMoney" : cartItem.product.price * cartItem.quantity
      }
      debugger
      this.orderDetailService.createOrderDetail(orderDetailDTO).subscribe({
        next : (response : any) => {
          debugger
          this.Success += 1;
        },error(err) {
            alert(err)
        },
      })
    });
    alert("Cập nhật thành công ${this.Success}");

  }

}
