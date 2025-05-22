import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { count } from 'rxjs';
import { LoginDTO } from 'src/app/dtos/loginDTO';
import { TokenService } from 'src/app/services/tokenService';
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
    private router : Router,
    private tokenService : TokenService
  ) { }

  login() {
    const loginDTO: LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password
    }
    debugger
    this.userService.login(loginDTO).subscribe({
      next: (response: any) => {
        debugger
        localStorage.clear();
        const token = response.token;

        if(token){
          this.tokenService.setToken(token);
        }
        this.router.navigate(['/'])
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    })
  }
}
