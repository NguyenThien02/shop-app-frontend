import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/dtos/ProductDTO';
import { environment } from 'src/app/environment/environment';
import { Category } from 'src/app/models/Category';
import { ProductResponse } from 'src/app/responses/ProductResponse';
import { UserResponse } from 'src/app/responses/UserResponse';
import { CategoryService } from 'src/app/services/CategoryService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-seller-create-product',
  templateUrl: './seller-create-product.component.html',
  styleUrls: ['./seller-create-product.component.scss'],
})
export class SellerCreateProductComponent implements OnInit {
  sellerId: number = 0;
  currentPage: number = 0;
  products: ProductResponse[] = [];
  totalPages: number = 0;
  pages: number[] = [];

  productName: string = '';
  description: string = '';
  price: number = 0;
  stockQuantity: number = 0;
  selectedFileImage?: File;
  fileProducts?: File;
  selectedCategoryId: number = 0;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getUserResponse();
    this.getAllProductBySeller();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllProductBySeller();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error(error: any) {
        alert(error.error);
      },
    });
  }

  getAllProductBySeller() {
    this.productService.getProductBySellerId(this.sellerId).subscribe({
      next: (response: any) => {
        response.productResponse.forEach((productResponse: ProductResponse) => {
          productResponse.image_url = `${environment.apiBaseUrl}/products/image-product/${productResponse.image_url}`;
        });
        this.products = response.productResponse;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
      },
      error(error: any) {
        alert(error.error);
      },
    });
  }

  getUserResponse() {
    this.sellerId =
      this.localStorageService.getUserResponseFromLocalStorage().id;
  }

  onFileSelected(event: any) {
    this.selectedFileImage = event.target.files[0];
  }
  createProduct() {
    const productDTO: ProductDTO = {
      product_name: this.productName,
      description: this.description,
      price: this.price,
      stock_quantity: this.stockQuantity,
      image_url: '',
      category_id: this.selectedCategoryId,
      seller_id: this.sellerId,
    };
    if (this.selectedFileImage) {
      this.productService
        .createProduct(productDTO, this.selectedFileImage)
        .subscribe({
          next: (response: any) => {
            alert('Tạo sản phẩm mới thành công');
          },
          complete() {
            window.location.reload();
          },
          error: (error: any) => {
            alert(error.error);
          },
        });
    }
  }

  onFileProduct(event: any) {
    this.fileProducts = event.target.files[0];
  }
  uploadFileProducts() {
    if (this.fileProducts) {
      this.productService
        .uploadFileProducts(this.fileProducts, this.sellerId)
        .subscribe({
          next: (response: any) => {
            alert(response.message);
          },complete() {
            window.location.reload();
          },
          error: (error: any) => {
            alert(error.error);
          },
        });
    }
  }
}
