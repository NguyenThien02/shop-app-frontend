import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponentComponent } from './components/register/register-component.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponentComponent,
    HeaderComponent,
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
