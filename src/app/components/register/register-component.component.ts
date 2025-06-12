import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterDTO } from 'src/app/dtos/RegisterDTO';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/RoleService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
})
export class RegisterComponentComponent implements OnInit {
  registerForm: FormGroup;
  roles: Role[] = [];

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group(
      {
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^0[0-9]{9}$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        fullName: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-ZÀ-ỹ\\s]+$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,16}$'
            ),
          ],
        ],
        retypePassword: ['', [Validators.required]],
        address: ['', Validators.required],
        birthday: [null, Validators.required],
        selectedRole: [null],
      },
      {
        validators: [this.passwordMatchValidator, this.checkAge],
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const retypePassword = form.get('retypePassword')?.value;

    if (password === retypePassword) {
      return null;
    }
    return { passwordMismatch: true };
  }

  checkAge(form: FormGroup) {
    const today = new Date();
    const birthdayValue = form.get('birthday')?.value;
    if (birthdayValue) {
      const birthday = new Date(birthdayValue);
      let age = today.getFullYear() - birthday.getFullYear();
      const monthDiff = today.getMonth() - birthday.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDay() < birthday.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        return { underage: true };
      }
    }
    return null;
  }

  ngOnInit() {
    this.getRole();
  }

  getRole() {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
      },
      error: (error: any) => {
        alert(error.error);
      },
    });
  }

  register() {
    if (this.registerForm.valid) {
      const registerDTO: RegisterDTO = {
        full_name: this.registerForm.value.fullName,
        phone_number: this.registerForm.value.phoneNumber,
        password: this.registerForm.value.password,
        retype_password: this.registerForm.value.retypePassword,
        birthday: this.registerForm.value.birthday,
        address: this.registerForm.value.address,
        role_id: this.registerForm.value.selectedRole?.roleId ?? 1,
      };
      debugger;
      this.userService.register(registerDTO).subscribe({
        next: (response: any) => {
          debugger;
          alert('Đăng ký thành công');
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          alert(error.error);
        },
      });
    }
  }
}
