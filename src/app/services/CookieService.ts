import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly SECRET_KEY = 'your-secret-key-here';

  constructor() {}
  // Mã hóa token trước khi lưu
  private encryptToken(token: string): string {
    return CryptoJS.AES.encrypt(token, this.SECRET_KEY).toString();
  }

  // Giải mã token khi đọc
  private decryptToken(encryptedToken: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, this.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting token:', error);
      return '';
    }
  }

  setCookie(name: string, value: string, days: number = 7): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    // Thêm các thuộc tính bảo mật cho cookie
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  getCookie(name: string): string {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
  }

  deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }

  setToken(token: string): void {
    // Mã hóa token trước khi lưu vào cookie
    const encryptedToken = this.encryptToken(token);
    this.setCookie(this.TOKEN_KEY, encryptedToken);
  }

  getToken(): string {
    // Lấy và giải mã token từ cookie
    const encryptedToken = this.getCookie(this.TOKEN_KEY);
    return encryptedToken ? this.decryptToken(encryptedToken) : '';
  }

  clearToken(): void {
    this.deleteCookie(this.TOKEN_KEY);
  }

  // Kiểm tra token có hợp lệ không
  isTokenValid(): boolean {
    const token = this.getToken();
    return token !== '' && token !== null;
  }
}
