import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailDTO } from 'src/app/dtos/OrderDetailDTO';
import { OrderDTO } from 'src/app/dtos/OrderDTO';
import { VoucherDTO, VoucherType } from 'src/app/dtos/VoucherDTO';
import { Voucher } from 'src/app/models/Voucher';
import { CartItemsResponse } from 'src/app/responses/CartItemResponse';
import { OrderResponse } from 'src/app/responses/OrderResponse';
import { UserResponse } from 'src/app/responses/UserResponse';
import { CartItemService } from 'src/app/services/CartItemService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { OrderDetailService } from 'src/app/services/OrderDetailService';
import { OrderService } from 'src/app/services/OrderService';
import { VoucherService } from 'src/app/services/VoucherService';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {
  userResponse?: UserResponse;
  seller?: UserResponse;
  vouchers: Voucher[] = [];
  shippingAddres: string = "";
  totalAmount: number = 0;
  preDiscount: number = 0;
  notes: string = "";
  selectCartItemsIds: number[] = [];
  selectCartItems: CartItemsResponse[] = [];
  orderId: number = 0;
  message: string = "";
  selectedVoucher?: Voucher;
  order_details: OrderDetailDTO[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private cartItemService: CartItemService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private voucherService: VoucherService,
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
          this.preDiscount += cartItem.product.price * cartItem.quantity;
          this.totalAmount = this.preDiscount;
        });
      }, 
      complete: () => {
        this.seller = this.selectCartItems[0].product.seller_respone;
        this.getVoucherBySeller();
      }, 
      error(error: any) {
        alert(error.error);
      },
    })
  }

  getVoucherBySeller(){
    debugger
    if(this.seller){
      this.voucherService.getVoucherBySeller(this.seller.id).subscribe({
        next: (response: any) => {
          debugger
          this.vouchers = response;
        },error: (error: any) => {
          alert(error.error);
        },
      })
    }
  }

  onVoucherChange(){
    debugger
    this.totalAmount = this.preDiscount;
    if(this.selectedVoucher?.type===VoucherType.PERCENTAGE){
      this.totalAmount = this.totalAmount - (this.totalAmount * (this.selectedVoucher.amount/100));
    }
    else if(this.selectedVoucher?.type === VoucherType.FIXED){
      this.totalAmount = this.totalAmount - this.selectedVoucher.amount;
    }
  }

  submitOrder() {
    if (this.userResponse) {
      if(this.seller){
        const orderDTO: OrderDTO = {
          user_id: this.userResponse.id,
          seller_id: this.seller.id,
          shipping_addres: this.shippingAddres,
          notes: this.notes,
          voucher_id: this.selectedVoucher?.voucherId,
          order_details: this.selectCartItems.map(item => ({
            productId: item.product.product_response_id,
            numberOfProducts: item.quantity,
            totalMoney: item.product.price * item.quantity
          }))
        };
        this.orderService.createOrder(orderDTO).subscribe({
          next: (response: any) => {
            alert("Đơn hàng đang được xử lý")
            this.router.navigate(["user/order-by-user-id/:user-id"])
          },error: (error: any) => {
            alert(error.error);
          },
        })
      }
    }
  }
}
