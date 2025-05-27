import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { OrderDTO } from '../dtos/OrderDTO';
import { HttpClient } from '@angular/common/http';

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
}
