import { Inject, Injectable } from '@angular/core'; 
import { DOCUMENT } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token'; 
    private jwtHelperService = new JwtHelperService();
    localStorage?:Storage;

    constructor(@Inject(DOCUMENT) private document: Document){
        this.localStorage = document.defaultView?.localStorage;
    }

    getToken():string {
        return this.localStorage?.getItem(this.TOKEN_KEY) ?? '';
    }

    setToken(token: string): void {
        if (this.localStorage) {
            this.localStorage.setItem(this.TOKEN_KEY, token);
        }
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