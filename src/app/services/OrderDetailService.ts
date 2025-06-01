import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { OrderDTO } from '../dtos/OrderDTO';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderDetailDTO } from '../dtos/OrderDetailDTO';

@Injectable({
  providedIn: 'root'
})

export class OrderDetailService {
  private apiOrderDetail = `${environment.apiBaseUrl}/order-details`;

  constructor(private http: HttpClient) { }

  createOrderDetail(orderDetailDTO: OrderDetailDTO) {
    return this.http.post(`${this.apiOrderDetail}/create`, orderDetailDTO);
  }

  getOrderDetailByOrderId(orderId: number, page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${this.apiOrderDetail}/${orderId}`, {params});
  }
}