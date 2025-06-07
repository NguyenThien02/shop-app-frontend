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
            Validators.maxLength(11),
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
        birthday: ['', Validators.required],
        selectedRole: [null, Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
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

  ngOnInit() {
    this.getRole();
  }

  getRole() {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
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
      this.userService.register(registerDTO).subscribe({
        next: (response: any) => {
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          alert(error.error);
        },
      });
    }
  }
}
