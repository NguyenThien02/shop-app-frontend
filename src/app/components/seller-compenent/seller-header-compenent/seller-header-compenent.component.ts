import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/UserResponse';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { CookieService } from 'src/app/services/CookieService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-seller-header-compenent',
  templateUrl: './seller-header-compenent.component.html',
  styleUrls: ['./seller-header-compenent.component.scss']
})
export class SellerHeaderCompenentComponent implements OnInit {
  userResponse?: UserResponse;
  isUserMenuOpen: Boolean = false;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    debugger
    this.userResponse = this.localStorageService.getUserResponseFromLocalStorage();
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    debugger
    if (confirmLogout) {
      localStorage.clear();
      this.cookieService.clearToken();
      this.router.navigate(['/']);
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
