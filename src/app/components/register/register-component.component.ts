import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterDTO } from 'src/app/dtos/registerDTO';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/RoleService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit{
  phoneNumber: string = "";
  fullName: string = "";
  password: string = "";
  retypePassword: string = "";
  birthday: Date = new Date();
  address: string = "";
  selectedRole : Role | undefined
  roles: Role[] = [];

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRole();
  }

  getRole(){
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  register() {
    debugger
    const registerDTO: RegisterDTO = {
      "full_name": this.fullName,
      "phone_number": this.phoneNumber,
      "password": this.password,
      "retype_password": this.password,
      "birthday": this.birthday,
      "address": this.address,
      "role_id": this.selectedRole?.roleId ?? 1
    }
    this.userService.register(registerDTO).subscribe({
      next: (response : any) => {
        debugger
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    })
  }

}
