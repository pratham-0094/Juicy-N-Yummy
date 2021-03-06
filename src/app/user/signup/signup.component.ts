import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userSignup } from 'src/app/model/userSignup';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signup: FormGroup;
  credential!: userSignup;

  constructor(private userAuth: UserAuthService, private router: Router) {
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

  userSignup() {
    if (this.signup.valid) {
      this.credential = {
        name: this.signup.value['name'],
        email: this.signup.value['email'],
        phone_no: this.signup.value['phone_no'],
        password: this.signup.value['password'],
      };
      this.signup.reset();
      this.userAuth.signup(this.credential);
    }
  }
}
