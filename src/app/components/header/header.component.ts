import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/UserResponse';
import { LocalStorageService } from 'src/app/services/LocalStorageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user?: UserResponse;
  isMenuOpen = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.localStorageService.getUserResponseFromLocalStorage();
  }

  navigateHome() {
    debugger;
    if (
      this.localStorageService.getUserResponseFromLocalStorage().role.roleId ==
      1
    ) {
      this.router.navigate(['/user/home']);
    }
    if (
      this.localStorageService.getUserResponseFromLocalStorage().role.roleId ==
      2
    ) {
      this.router.navigate(['/seller/home']);
    }
  }

  getCart() {
    const cartId = this.localStorageService.getCartFromLocalStorage();
    if (cartId) {
      this.router.navigate(['/user/cart', cartId]);
    } else {
      console.warn('No cart ID found in local storage.');
    }
  }

  getOrder() {
    debugger;
    const user = this.localStorageService.getUserResponseFromLocalStorage();
    if (user) {
      const userId = user.id;
      this.router.navigate(['user/order-by-user-id/', userId]);
    } else {
      console.warn('No user found in local storage.');
    }
  }

  PersonalProfile() {
    debugger;
    if (this.user?.role.roleId == 1) {
      this.router.navigate(['/']);
    }
    if (this.user?.role.roleId == 2) {
      this.router.navigate(['/seller/home']);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
    if (confirmLogout) {
      localStorage.clear();
      window.location.reload();
      this.router.navigate(['/']);
    }
  }
}
