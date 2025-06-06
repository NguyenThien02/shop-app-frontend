import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-select-service',
  templateUrl: './seller-select-service.component.html',
  styleUrls: ['./seller-select-service.component.scss']
})
export class SellerSelectServiceComponent {
  constructor(
    private router: Router
  ) { }

  isActive(route: string): boolean {
    return this.router.url.includes(route); 
  }
}
