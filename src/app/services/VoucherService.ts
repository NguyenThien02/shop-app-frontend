import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { VoucherDTO } from '../dtos/VoucherDTO';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private apiVouchers = `${environment.apiBaseUrl}/vouchers`;
  
  constructor(
    private http : HttpClient
  ) { }

  createVoucher(voucherDTO: VoucherDTO){
    return this.http.post(this.apiVouchers, voucherDTO);
  }

  getVoucherBySeller(sellerId : number){
    return this.http.get(`${this.apiVouchers}/${sellerId}`);
  }
}
