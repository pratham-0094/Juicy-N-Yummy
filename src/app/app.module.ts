import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AdminsignupComponent } from './admin/adminsignup/adminsignup.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { RestaurantComponent } from './user/restaurant/restaurant.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { EditprofileComponent } from './dialog/editprofile/editprofile.component';
import { CartComponent } from './dialog/cart/cart.component';
import { MenuComponent } from './user/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './user/order/order.component';
import { ReviewComponent } from './user/review/review.component';
import { AddComponent } from './admin/add/add.component';
import { EditadminComponent } from './dialog/editadmin/editadmin.component';
import { MatRadioModule } from '@angular/material/radio';
import { ItemsComponent } from './admin/items/items.component';
import { FeedbackComponent } from './admin/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AdminsignupComponent,
    AdminloginComponent,
    RestaurantComponent,
    DashboardComponent,
    EditprofileComponent,
    CartComponent,
    MenuComponent,
    OrderComponent,
    ReviewComponent,
    AddComponent,
    EditadminComponent,
    ItemsComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
