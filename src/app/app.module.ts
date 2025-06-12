import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponentComponent } from './components/register/register-component.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptors/interceptor';
import { UserHomeComponentComponent } from './components/user-component/user-home-component/user-home-component.component';

import { SellerHeaderCompenentComponent } from './components/seller-compenent/seller-header-compenent/seller-header-compenent.component';
import { SellerHomeComponentComponent } from './components/seller-compenent/seller-home-component/seller-home-component.component';
import { SellerCreateProductComponent } from './components/seller-compenent/seller-create-product/seller-create-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserCartComponent } from './components/user-component/user-cart/user-cart.component';
import { UserOrderComponent } from './components/user-component/user-create-order-component/user-order.component';
import { UserGetOrderComponentComponent } from './components/user-component/user-get-order-component/user-get-order-component.component';
import { UserGetOrderDetailComponentComponent } from './components/user-component/user-get-order-detail-component/user-get-order-detail-component.component';
import { SellerSelectServiceComponent } from './components/seller-compenent/seller-select-service/seller-select-service.component';
import { OrderManagementComponentComponent } from './components/seller-compenent/order-management-component/order-management-component.component';
import { VoucherManagementComponentComponent } from './components/seller-compenent/voucher-management-component/voucher-management-component.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponentComponent,
    HeaderComponent,
    AppComponent,
    LoginComponent,
    UserHomeComponentComponent,
    
    SellerHeaderCompenentComponent,
    SellerHomeComponentComponent,
    SellerCreateProductComponent,
    ProductDetailComponent,
    UserCartComponent,
    UserOrderComponent,
    UserGetOrderComponentComponent,
    UserGetOrderDetailComponentComponent,
    SellerSelectServiceComponent,
    OrderManagementComponentComponent,
    VoucherManagementComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
    providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
