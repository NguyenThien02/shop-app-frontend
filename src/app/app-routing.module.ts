import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponentComponent } from './components/register/register-component.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponentComponent},
    {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
