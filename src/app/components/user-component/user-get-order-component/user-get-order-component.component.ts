import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/responses/OrderResponse';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-user-get-order-component',
  templateUrl: './user-get-order-component.component.html',
  styleUrls: ['./user-get-order-component.component.scss']
})
export class UserGetOrderComponentComponent implements OnInit {
  orders: OrderResponse[] = [];
  userId: number = 0;
  page: number = 0;
  limit: number = 10;
  pages: number[] = [];
  totalPages: number = 0

  statusOptions = [
    { value: 'PENDING', label: 'Chờ xử lý', class: 'status-pending' },
    { value: 'PROCESSING', label: 'Đang xử lý', class: 'status-processing' },
    { value: 'SHIPPED', label: 'Đang giao', class: 'status-shipping' },
    { value: 'DELIVERED', label: 'Đã giao', class: 'status-delivered' },
    { value: 'CANCELED', label: 'Đã hủy', class: 'status-cancelled' }
  ];

  constructor(
    private orderService: OrderService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.getOrderByUserId(this.page);
  }

  getUserId() {
    const user = this.localStorageService.getUserResponseFromLocalStorage();
    if (user) {
      this.userId = user.id;
    }
  }

  getOrderByUserId(page: number) {
    this.orderService.getOrderByUserId(this.userId, page, this.limit).subscribe({
      next: (response: any) => {
        debugger
        this.orders = response.orderResponses;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i)
      }, error(err) {
        alert(err);
      },
    })
  }

  changePage(page: number){
    this.getOrderByUserId(page);
    this.page = page;
  }

  getStatusLabel(status: string): string {
    const statusOption = this.statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.label : status;
  }

  getStatusClass(status: string): string {
    const statusOption = this.statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.class : '';
  }
}
