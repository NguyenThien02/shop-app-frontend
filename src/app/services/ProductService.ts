import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProductDTO } from "../dtos/ProductDTO";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiGetProductByCategory = `${environment.apiBaseUrl}/products/by-category`;
    private apiGetFeaturedProduct = `${environment.apiBaseUrl}/products/featured`;
    private apiCreateProduct = `${environment.apiBaseUrl}/products/create`
    
    constructor(private http: HttpClient){ }

    getProductByCategory(page : number, limit : number, categoryId : number){
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('category_id', categoryId.toString());

        return this.http.get(this.apiGetProductByCategory,{params});
    }

    getFeaturedProduct(page : number, limit : number, categoryId : number){
        debugger
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('category_id', categoryId.toString());

        return this.http.get(this.apiGetFeaturedProduct,{params});
    }

    createProduct(productDTO : ProductDTO, file : File){
        const formData = new FormData();
        formData.append('product', JSON.stringify(productDTO));
        formData.append('file', file, file.name);

        return this.http.post(this.apiCreateProduct,formData);
    }
}