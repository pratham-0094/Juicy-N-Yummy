import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from './dialog/editprofile/editprofile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userAuth!: Boolean;
  adminAuth!: Boolean;

  title = 'Juicy-N-Yummy';
  constructor(public router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (localStorage.getItem('userAuth')) {
      this.userAuth = true;
    } else {
      this.userAuth = false;
    }
    if (localStorage.getItem('adminAuth')) {
      this.adminAuth = true;
    } else {
      this.adminAuth = false;
    }
  }

  edit() {
    this.dialog.open(EditprofileComponent);
  }

  logout() {
    if (localStorage.getItem('userAuth')) {
      localStorage.removeItem('userAuth');
      this.userAuth = false;
    }
    if (localStorage.getItem('adminAuth')) {
      localStorage.removeItem('adminAuth');
      this.adminAuth = false;
    }
    this.router.navigateByUrl('/');
  }
}
