import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from './dialog/editprofile/editprofile.component';
import { CartComponent } from './dialog/cart/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Juicy-N-Yummy';
  constructor(public router: Router, public dialog: MatDialog) {}

  edit() {
    this.dialog.open(EditprofileComponent);
  }

  cart() {
    this.dialog.open(CartComponent);
  }
}
