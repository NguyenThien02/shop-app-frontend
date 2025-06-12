import { Component, OnInit } from '@angular/core';
import { VoucherDTO, VoucherType } from 'src/app/dtos/VoucherDTO';
import { Voucher } from 'src/app/models/Voucher';
import { UserResponse } from 'src/app/responses/UserResponse';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { VoucherService } from 'src/app/services/VoucherService';

@Component({
  selector: 'app-voucher-management-component',
  templateUrl: './voucher-management-component.component.html',
  styleUrls: ['./voucher-management-component.component.scss'],
})
export class VoucherManagementComponentComponent implements OnInit {
  seller?: UserResponse;
  voucherDTO: VoucherDTO = new VoucherDTO({});
  voucherTypes = VoucherType;
  vouchers: Voucher[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private voucherService: VoucherService
  ) {
    this.initializeVoucher();
  }

  ngOnInit(): void {
    this.getSeller();
    this.getVoucherBySeller();
  }

  getSeller() {
    this.seller = this.localStorageService.getUserResponseFromLocalStorage();
    if (this.seller) {
      this.voucherDTO.sellerId = this.seller.id;
    }
  }

  private initializeVoucher() {
    this.voucherDTO = {
      sellerId: 0,
      type: VoucherType.PERCENTAGE,
      amount: 0,
      description: '',
      minOrderCost: 0,
      expiryDatetime: '',
      limitUsage: 1,
    };
  }

  createVoucher() {
    if (
      this.voucherDTO.type === VoucherType.PERCENTAGE &&
      this.voucherDTO.amount > 100
    ) {
      alert('Phần trăm giảm giá không được vượt quá 100%');
      return;
    }

    // Kiểm tra ngày hết hạn
    const expiryDate = new Date(this.voucherDTO.expiryDatetime);
    if (expiryDate <= new Date()) {
      alert('Ngày hết hạn phải lớn hơn thời gian hiện tại');
      return;
    }
    debugger;
    this.voucherService.createVoucher(this.voucherDTO).subscribe({
      next: (response: any) => {
        debugger;
        alert('Tạo thành công voucher');
      },
      complete() {
        window.location.reload();
      },
      error(err: any) {
        alert(err.err);
      },
    });
  }

  getVoucherBySeller() {
    if (this.seller) {
      this.voucherService.getVoucherBySeller(this.seller.id).subscribe({
        next: (response: any) => {
          debugger;
          this.vouchers = response;
        },
        error: (error: any) => {
          alert(error.error);
        },
      });
    }
  }

  isVoucherActive(voucher: Voucher): boolean {
    const now = new Date();
    const expiryDate = new Date(voucher.expiryDatetime);
    return expiryDate > now;
  }
}
