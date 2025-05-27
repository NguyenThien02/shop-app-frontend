import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserResponse } from '../responses/UserResponse';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    // readonly: Ngăn không cho gán lại giá trị sau khi khởi tạo
    private readonly TOKEN_KEY = 'access_token';
    private readonly USER_RESPONSE = 'user_response';
    private readonly CART = 'cart';
    private readonly CARTITEMS = 'cart_items';

    // private jwtHelperService = new JwtHelperService();
    // Biến tham chiếu đến localStorage của trình duyệt
    localStorage?: Storage;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.localStorage = document.defaultView?.localStorage;
    }

    setToken(token: string): void {
        if (this.localStorage) {
            this.localStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    getToken(): string {
        return this.localStorage?.getItem(this.TOKEN_KEY) ?? '';
    }

    setUserResponseToLocalStorage(userResponse: UserResponse) {
        //chuyển đổi đối tượng userResponse thành một chuỗi JSON
        const userResponseJSON = JSON.stringify(userResponse);
        localStorage.setItem(this.USER_RESPONSE, userResponseJSON);
    }

    getUserResponseFromLocalStorage() {
        const userResponseJSON = this.localStorage?.getItem(this.USER_RESPONSE);
        const userResponse = JSON.parse(userResponseJSON ?? 'null')
        return userResponse;
    }

    setCartToLocalStorage(cartId: number) {
        const cartIdString = cartId.toString();
        localStorage.setItem(this.CART, cartIdString);
    }

    getCartFromLocalStorage(): number | null {
        const cartIdString = this.localStorage?.getItem(this.CART);
        const cartId = cartIdString ? +cartIdString : null;
        return cartId;
    }

    getCartItemsFromLocalStorage(){
        const listCartItemId = this.localStorage?.getItem(this.CARTITEMS);
        return listCartItemId;
    }

    setCartItemsToLocalStorage(selectCartItemsIds : number[]){
        return this.localStorage?.setItem(this.CARTITEMS, JSON.stringify(selectCartItemsIds));
    }


    // removeToken(): void {
    //     if (this.localStorage) {
    //         this.localStorage.removeItem(this.TOKEN_KEY);
    //     }
    // }

    // isTokenExpired(): boolean {
    //     const token = this.getToken();

    //     if (token === null || token === '') { 
    //         return false; 
    //     }

    //     return this.jwtHelperService.isTokenExpired(token);
    // }
}