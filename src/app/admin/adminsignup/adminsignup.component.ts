import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { adminAuthSignup } from 'src/app/model/adminAuthSignup';
import { AdminAuthService } from 'src/app/service/admin-auth.service';

@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css'],
})
export class AdminsignupComponent implements OnInit {
  signup: FormGroup;
  credential!: adminAuthSignup;

  constructor(private adminAuth: AdminAuthService, private router: Router) {
    this.signup = new FormGroup({
      phone_no: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      restaurant: new FormControl(''),
      address: new FormControl(''),
      distict: new FormControl(''),
      state: new FormControl(''),
      landmark: new FormControl(''),
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

  adminSignup() {
    if (this.signup.valid) {
      this.credential = {
        name: this.signup.value['name'],
        email: this.signup.value['email'],
        phone_no: this.signup.value['phone_no'],
        password: this.signup.value['password'],
        restaurant: this.signup.value['restaurant'],
        address: this.signup.value['address'],
        distict: this.signup.value['distict'],
        state: this.signup.value['state'],
        landmark: this.signup.value['landmark'],
      };
      this.signup.reset();
      this.adminAuth.signup(this.credential);
    }
  }
}
