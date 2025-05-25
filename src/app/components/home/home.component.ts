import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { Category } from 'src/app/models/Category';
import { ProductResponse } from 'src/app/responses/ProductResponse';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categoryId: number = 0;
  productRespons: ProductResponse[] = [];
  featuredProductRespons: ProductResponse[] = [];

  page: number = 0;
  limit: number = 12;
  totalPages: number = 0;
  pages: number[] = [];

  pageFeatured: number = 0;
  limitFeatured: number = 10;

  isModalOpen = false;
  quantity = 1;
  selectedProduct: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProductByCategory(this.page, this.limit, this.categoryId);
    this.getFeaturedProduct(this.pageFeatured, this.limitFeatured);
  }

  getProductByCategory(page: number, limit: number, categoryId: number) {
    this.productService.getProductByCategory(page, limit, categoryId).subscribe({
      next: (response: any) => {
        response.productResponse.forEach((productResponse: ProductResponse) => {
          productResponse.image_url = `${environment.apiBaseUrl}/products/image-product/${productResponse.image_url}`;
        });
        this.totalPages = response.totalPages;
        this.productRespons = response.productResponse;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    })
  }

  getFeaturedProduct(pageFeatured: number, limitFeatured: number) {
    debugger
    this.productService.getFeaturedProduct(pageFeatured, limitFeatured, 0).subscribe({
      next: (response: any) => {
        debugger
        response.productResponse.forEach((productResponse: ProductResponse) => {
          productResponse.image_url = `${environment.apiBaseUrl}/products/image-product/${productResponse.image_url}`;
        });
        this.featuredProductRespons = response.productResponse;
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    })
  }

  openProductDetail(product: any) {
    debugger
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getProductByCategory(this.page, this.limit, this.categoryId);
    }
  }
}
