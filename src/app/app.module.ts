import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { AdminsignupComponent } from './admin/adminsignup/adminsignup.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdminnavbarComponent } from './admin/adminnavbar/adminnavbar.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, SignupComponent, NavbarComponent, AdminsignupComponent, AdminloginComponent, AdminnavbarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
