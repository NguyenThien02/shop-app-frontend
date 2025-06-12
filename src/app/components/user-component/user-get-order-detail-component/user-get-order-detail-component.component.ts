import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { OrderDetailResponse } from 'src/app/responses/OrderDetailResponse';
import { OrderResponse } from 'src/app/responses/OrderResponse';
import { ProductResponse } from 'src/app/responses/ProductResponse';
import { UserResponse } from 'src/app/responses/UserResponse';
import { OrderDetailService } from 'src/app/services/OrderDetailService';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-user-get-order-detail-component',
  templateUrl: './user-get-order-detail-component.component.html',
  styleUrls: ['./user-get-order-detail-component.component.scss']
})
export class UserGetOrderDetailComponentComponent implements OnInit {

  orderId: number = 0;
  orderResponse?: OrderResponse;
  orderDetails: OrderDetailResponse[] = [];
  page: number = 0;
  limit: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  seller?: UserResponse

  constructor(
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrderId();
    this.getOrderDetailByOrderId(this.page);
    this.getOrderById();
  }

  getOrderId() {
    const orderIdParam = this.route.snapshot.paramMap.get('order-id');
    if (orderIdParam !== null) {
      const orderId = +orderIdParam;
      this.orderId = orderId;
    } else {
      console.warn('Không tìm thấy order Id');
    }
  }

  getOrderDetailByOrderId(page: number) {
    this.orderDetailService.getOrderDetailByOrderId(this.orderId, this.page, this.limit).subscribe({
      next: (response: any) => {
        response.orderDetailList.forEach((orderDetail: OrderDetailResponse) => {
          orderDetail.productResponse.image_url = `${environment.apiBaseUrl}/products/image-product/${orderDetail.productResponse.image_url}`;
        });
        this.orderDetails = response.orderDetailList;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      }, 
      complete: () => {
        this.seller = this.orderDetails[0].productResponse.seller_respone
      }, error(err) {
        alert(err);
      },
    })
  }

  getOrderById(){
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {
        this.orderResponse = response;
      },error(err) {
          alert(err);
      },
    })
  }

  changePage(page: number){
    this.getOrderDetailByOrderId(page);
  }
}
