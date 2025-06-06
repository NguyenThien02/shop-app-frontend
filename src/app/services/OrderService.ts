import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { OrderDTO } from '../dtos/OrderDTO';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiOrder = `${environment.apiBaseUrl}/orders`;

  constructor(
    private http : HttpClient
  ) { }

  createOrder(orderDTO : OrderDTO){
    return this.http.post(`${this.apiOrder}/create`, orderDTO);
  }

  getOrderByUserId(userId: number, page: number, limit: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(`${this.apiOrder}/by-user-id/${userId}`,{params});
  }

  getOrderById(orderId: number){
    return this.http.get(`${this.apiOrder}/by-order-id/${orderId}`);
  }

  getOrderBySellerId(sellerId: number, page: number, limit: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    return this.http.get(`${this.apiOrder}/by-seller-id/${sellerId}`,{params});
  }

  updateOrderStatus(orderId: number, orderStatus: string){
    debugger
    const params = new HttpParams()
      .set('orderId', orderId.toString())
      .set('orderStatus', orderStatus.toString());
    return this.http.put(`${this.apiOrder}/update-order-status`,null, {params});
  }
}
