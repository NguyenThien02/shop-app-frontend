import { Component } from '@angular/core';
import { UserResponse } from 'src/app/responses/UserResponse';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-seller-home-component',
  templateUrl: './seller-home-component.component.html',
  styleUrls: ['./seller-home-component.component.scss']
})
export class SellerHomeComponentComponent {
  userResponse?: UserResponse;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    debugger
    this.userResponse = this.localStorageService.getUserResponseFromLocalStorage();
  }
}
