import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { CartDTO } from "../dtos/CartDTO";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private apiCreatCart = `${environment.apiBaseUrl}/carts/create`;
    private apiGetCartByUserId = `${environment.apiBaseUrl}/carts`;

    constructor(private http: HttpClient) { }

    creatCart(cartDTO : CartDTO) {
        return this.http.post(this.apiCreatCart, cartDTO);
    }

    getCartByUserId(userId : number){
        return this.http.get(`${this.apiGetCartByUserId}/${userId}`);
    }
}
