import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/dtos/ProductDTO';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/CategoryService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-seller-create-product',
  templateUrl: './seller-create-product.component.html',
  styleUrls: ['./seller-create-product.component.scss']
})
export class SellerCreateProductComponent implements OnInit {

  productName: string = ""
  description: string = ""
  price: number = 0;
  stockQuantity: number = 0;
  selectedFile?: File;
  selectedCategoryId: number = 0;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        debugger
        this.categories = response;
      }, error(err) {
        alert(`Error get all categories: ${err}`)
      },
    })
  }

  createProduct() {
    debugger
    const productDTO: ProductDTO = {
      "product_name": this.productName,
      "description": this.description,
      "price": this.price,
      "stock_quantity": this.stockQuantity,
      "image_url": "",
      "category_id": this.selectedCategoryId,
      "seller_id": this.localStorageService.getUserResponseFromLocalStorage().id
    }
    if (this.selectedFile) {
      this.productService.createProduct(productDTO, this.selectedFile).subscribe({
        next : (response : any) => {
          debugger
          alert("create successful product")
        },error(err) {
            console.error('Error:', err);
        },
      })
    } else {
      console.error('File is required');
    }
  }
}
