import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { OrderDTO } from '../dtos/OrderDTO';
import { HttpClient } from '@angular/common/http';
import { OrderDetailDTO } from '../dtos/OrderDetailDTO';

@Injectable({
  providedIn: 'root'
})

export class OrderDetailService{
    private apiOrderDetail = `${environment.apiBaseUrl}/order-details`;

    constructor(private http : HttpClient){}

    createOrderDetail(orderDetailDTO : OrderDetailDTO){
        return this.http.post(`${this.apiOrderDetail}/create`, orderDetailDTO);
    }
}