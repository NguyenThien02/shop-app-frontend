import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/dtos/LoginDTO';
import { CartService } from 'src/app/services/CartService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { UserService } from 'src/app/services/UserService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  phoneNumber: string = "";
  password: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private cartService : CartService
  ) { }

  login() {
    const loginDTO: LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password
    }
    debugger
    localStorage.clear();
    this.userService.login(loginDTO).subscribe({
      next: (response: any) => {
        debugger
        const token = response.token;

        if (token) {
          this.localStorageService.setToken(token);
          this.localStorageService.setUserResponseToLocalStorage(response.user_response)
        }
        if (response.user_response.role.roleId == 1) {
          this.setCartToLocalStorage(response.user_response.id);
          this.router.navigate(['/'])
        }
        if (response.user_response.role.roleId == 2) {
          this.router.navigate(['/seller/home'])
        }
      },
      error: (error: any) => {
        alert(error.error)
      }
    })
  }

  setCartToLocalStorage(userId : number){
    debugger
    this.cartService.getCartByUserId(userId).subscribe({
      next : (response : any) => {
        debugger
        this.localStorageService.setCartToLocalStorage(response.id);
      },error(err) {
          console.error(err);
      },
    })
  }
}
