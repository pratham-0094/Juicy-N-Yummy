import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdminnavbarComponent } from './admin/adminnavbar/adminnavbar.component';
import { AdminsignupComponent } from './admin/adminsignup/adminsignup.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'admin',
    component: AdminnavbarComponent,
  },
  {
    path: 'adminlogin',
    component: AdminloginComponent,
  },
  {
    path: 'adminsignup',
    component: AdminsignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
