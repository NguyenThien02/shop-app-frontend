import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponentComponent } from './components/register/register-component.component';
import { LoginComponent } from './components/login/login.component';

import { UserHomeComponentComponent } from './components/user-component/user-home-component/user-home-component.component';

import { SellerHomeComponentComponent } from './components/seller-compenent/seller-home-component/seller-home-component.component';
import { SellerCreateProductComponent } from './components/seller-compenent/seller-create-product/seller-create-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserCartComponent } from './components/user-component/user-cart/user-cart.component';
import { UserOrderComponent } from './components/user-component/user-create-order-component/user-order.component';
import { UserGetOrderComponentComponent } from './components/user-component/user-get-order-component/user-get-order-component.component';
import { UserGetOrderDetailComponentComponent } from './components/user-component/user-get-order-detail-component/user-get-order-detail-component.component';
import { OrderManagementComponentComponent } from './components/seller-compenent/order-management-component/order-management-component.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponentComponent},
    {path: 'login', component: LoginComponent},
    {path: 'product-detail/:product-id', component: ProductDetailComponent},

    {path: 'user/home', component: UserHomeComponentComponent},
    {path: 'user/cart/:cart-id', component: UserCartComponent},
    {path: 'user/order', component: UserOrderComponent},
    {path: 'user/order-by-user-id/:user-id', component: UserGetOrderComponentComponent},
    {path: 'user/get-order-detail/:order-id', component: UserGetOrderDetailComponentComponent},

    {path: 'seller/home', component: SellerHomeComponentComponent},
    {path: 'seller/create-product', component: SellerCreateProductComponent},
    {path: 'seller/order-management', component: OrderManagementComponentComponent} 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
