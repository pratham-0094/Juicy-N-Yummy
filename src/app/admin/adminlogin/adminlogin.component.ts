import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { adminAuthLogin } from 'src/app/model/adminAuthLogin';
import { AdminAuthService } from 'src/app/service/admin-auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {
  login: FormGroup;
  credential!: adminAuthLogin;

  constructor(private adminAuth: AdminAuthService, private router: Router) {
    this.login = new FormGroup({
      phone_no: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('userAuth')) {
      this.router.navigateByUrl('/restaurant');
    }
    if (localStorage.getItem('adminAuth')) {
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  adminLogin() {
    if (this.login.valid) {
      const credential = {
        phone_no: this.login.value['phone_no'],
      };
      this.login.reset();
      this.adminAuth.login(credential);
    }
  }
}
