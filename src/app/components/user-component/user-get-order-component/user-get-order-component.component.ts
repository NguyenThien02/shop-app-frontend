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

  constructor(
    private orderService: OrderService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.getOrderByUserId();
  }

  getUserId() {
    const user = this.localStorageService.getUserResponseFromLocalStorage();
    if (user) {
      this.userId = user.id;
    }
  }

  getOrderByUserId() {
    this.orderService.getOrderByUserId(this.userId, this.page, this.limit).subscribe({
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

  }
}
