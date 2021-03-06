import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './admin/add/add.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdminsignupComponent } from './admin/adminsignup/adminsignup.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FeedbackComponent } from './admin/feedback/feedback.component';
import { ItemsComponent } from './admin/items/items.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { MenuComponent } from './user/menu/menu.component';
import { OrderComponent } from './user/order/order.component';
import { RestaurantComponent } from './user/restaurant/restaurant.component';
import { ReviewComponent } from './user/review/review.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'signup',
        component: AdminsignupComponent,
      },
      {
        path: 'login',
        component: AdminloginComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: 'order',
            component: ItemsComponent,
          },
          {
            path: 'review',
            component: FeedbackComponent,
          },
          {
            path: 'add',
            component: AddComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'restaurant',
    component: RestaurantComponent,
  },
  {
    path: ':id',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: OrderComponent,
      },
      {
        path: 'review',
        component: ReviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
