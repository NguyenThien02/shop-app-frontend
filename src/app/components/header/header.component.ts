import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/LocalStorageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private localStorageService : LocalStorageService,
    private router : Router
  ){}

  navigateHome(){
    debugger
    if(this.localStorageService.getUserResponseFromLocalStorage().role.roleId == 1){
      this.router.navigate(['/user/home'])
    }
    if(this.localStorageService.getUserResponseFromLocalStorage().role.roleId == 2){
      this.router.navigate(['/seller/home'])
    }
  }
}
