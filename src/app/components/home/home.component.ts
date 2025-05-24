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
export class HomeComponent implements OnInit{
  categoryId: number = 0;
  productRespons: ProductResponse[] =[];
  featuredProductRespons : ProductResponse[] = [];

  page: number = 0;
  limit: number = 9;
  totalPages: number = 0;
  pages: number[] = [];

  pageFeatured : number = 0;
  limitFeatured : number = 3;

  constructor(
    private productService : ProductService
  ){}

  ngOnInit(){
    this.getProductByCategory(this.page, this.limit, this.categoryId);
    this.getFeaturedProduct(this.pageFeatured, this.limitFeatured);
  }

  getProductByCategory(page : number, limit : number, categoryId : number){
    this.productService.getProductByCategory(page, limit, categoryId).subscribe({
      next: (response : any) => {
        response.productResponse.forEach((productResponse: ProductResponse) => {
          productResponse.image_url = `${environment.apiBaseUrl}/products/image-product/${productResponse.image_url}`;
        });
        this.totalPages = response.totalPages;
        this.productRespons = response.productResponse;
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    })
  }

  getFeaturedProduct(pageFeatured : number, limitFeatured : number){
    debugger
    this.productService.getFeaturedProduct(pageFeatured, limitFeatured, 0).subscribe({
      next: (response : any) => {
        debugger
        // for(ProductResponse featuredProductRespons : response.productResponse )
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

  nextSlide() {
    this.getFeaturedProduct(this.pageFeatured + 1, this.limitFeatured);
    this.pageFeatured += 1;
  }

  prevSlide() {
    this.getFeaturedProduct(this.pageFeatured - 1, this.limitFeatured);
    this.pageFeatured -= 1;
  }
}
