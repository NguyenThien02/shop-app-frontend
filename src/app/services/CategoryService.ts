import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiCategories = `${environment.apiBaseUrl}/categories`;

    constructor(private http : HttpClient){}

    getAllCategories(){
        return this.http.get(this.apiCategories);
    }
}