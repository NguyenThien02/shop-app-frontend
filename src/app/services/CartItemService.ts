import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CartItemsDTO } from "../dtos/CartItemsDTO";

@Injectable({
    providedIn: 'root'
})

export class CartItemService {
    private apiCartItem = `${environment.apiBaseUrl}/cart-items`;

    constructor(
        private http: HttpClient
    ) { }

    createCartItem(cartItemsDTO: CartItemsDTO) {
        return this.http.post(`${this.apiCartItem}/create`, cartItemsDTO);
    }

    getAllCartItemByCartId(cartId: number, page: number, limit: number) {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        return this.http.get(`${this.apiCartItem}/${cartId}`, {params});
    }

    deleteCartItemById(cartItemId : number){
        return this.http.delete(`${this.apiCartItem}/${cartItemId}`);
    }

    getCartItemByIds(selectCartItemsIds : number[]){
        return this.http.post(`${this.apiCartItem}/by-ids`, selectCartItemsIds)
    }
}