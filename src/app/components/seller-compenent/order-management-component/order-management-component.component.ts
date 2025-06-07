import { Component, OnInit } from '@angular/core';
import { UpdateOrderStatusDTO } from 'src/app/dtos/UpdateOrderStatusDTO';
import { OrderResponse } from 'src/app/responses/OrderResponse';
import { UserResponse } from 'src/app/responses/UserResponse';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-order-management-component',
  templateUrl: './order-management-component.component.html',
  styleUrls: ['./order-management-component.component.scss']
})
export class OrderManagementComponentComponent implements OnInit {
  sellerId: number | undefined;
  sellerResponse?: UserResponse;
  page: number = 0;
  limit: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  orders: OrderResponse[] = [];
  // Biến để kiểm soát hiển thị của modal "Cập nhật trạng thái"
  isUpdateStatusModalOpen: boolean = false;
  // Biến để kiểm soát hiển thị của dropdown "Trạng thái mới" bên trong modal
  isOrderStatusDropdownOpen: boolean = false;
  // Biến lưu trữ trạng thái đơn hàng đã chọn
  selectedOrderStatus: string = 'Chọn trạng thái'; // Mặc định hiển thị

  orderStatus: string = "";

  // Biến lưu trữ ID đơn hàng đang được cập nhật (ví dụ)
  currentOrderId: number = 0;

  // Danh sách các trạng thái để hiển thị trong dropdown
  statusOptions = [
    { value: 'PENDING', label: 'Chờ xử lý', class: 'status-pending' },
    { value: 'PROCESSING', label: 'Đang xử lý', class: 'status-processing' },
    { value: 'SHIPPED', label: 'Đang giao', class: 'status-shipping' },
    { value: 'DELIVERED', label: 'Đã giao', class: 'status-delivered' },
    { value: 'CANCELED', label: 'Đã hủy', class: 'status-cancelled' }
  ];

  constructor(
    private localstorageService: LocalStorageService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getSellerId();
    this.getOrderBySellerId(this.page);
  }

  getSellerId() {
    this.sellerResponse = this.localstorageService.getUserResponseFromLocalStorage();
    this.sellerId = this.sellerResponse?.id;
  }

  getOrderBySellerId(page: number) {
    if (this.sellerId) {
      debugger
      this.orderService.getOrderBySellerId(this.sellerId, this.page, this.limit).subscribe({
        next: (response: any) => {
          debugger
          this.orders = response.orderResponses;
          this.totalPages = response.totalPages;
          this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        }, error(error: any) {
          alert(error.error)
        },
      })
    }
  }

  // Chuyển đổi trạng thái hiển thị của dropdown chọn trạng thái
  toggleOrderStatusDropdown() {
    this.isOrderStatusDropdownOpen = !this.isOrderStatusDropdownOpen;
  }
  // Mở modal cập nhật trạng thái
  openUpdateStatusModal(orderId: number) {
    this.currentOrderId = orderId; // Lưu ID đơn hàng để hiển thị trong modal
    this.isUpdateStatusModalOpen = true;
  }

  // Đóng modal cập nhật trạng thái
  closeUpdateStatusModal() {
    this.isUpdateStatusModalOpen = false;
    this.isOrderStatusDropdownOpen = false; // Đảm bảo dropdown cũng đóng
    // Reset các giá trị khác của form nếu cần
    this.selectedOrderStatus = 'Chọn trạng thái';
  }

  selectOrderStatus(status: { value: string, label: string, class: string }) {
    this.selectedOrderStatus = status.label;
    this.orderStatus = status.value;
    this.isOrderStatusDropdownOpen = false;
  }

  saveUpdateStatus() {
    debugger
    this.orderService.updateOrderStatus(this.currentOrderId, this.orderStatus).subscribe({
      next: (response: any) => {

      },
      complete() {
        alert('Cập nhật thành công trạng thái order');
        window.location.reload();
      },
      error(error: any) {
        alert(error.error);
      },
    })
  }

  // Phương thức để lấy các lớp Tailwind cho thẻ trạng thái
  getStatusBadgeClasses(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'bg-orange-100 text-orange-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': // Giả định bạn muốn màu tím cho SHIPPED
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELED': // Sử dụng CANCELED thay vì CANCELLED cho khớp với enum
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800'; // Màu mặc định nếu trạng thái không xác định
    }
  }
  getVietnameseStatus(statusValue: string): string {
    const option = this.statusOptions.find(option => option.value === statusValue);
    return option ? option.label : statusValue; // Trả về label nếu tìm thấy, ngược lại trả về nguyên trạng thái (phòng trường hợp không khớp)
  }

  changePage(page: number) {
    this.getOrderBySellerId(page);
    this.page = page;
  }

}
