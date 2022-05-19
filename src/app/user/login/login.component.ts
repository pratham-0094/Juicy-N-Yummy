import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userLogin } from 'src/app/model/userLogin';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  credential!: userLogin;

  constructor(private userAuth: UserAuthService, private router: Router) {
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

  userLogin() {
    if (this.login.valid) {
      const credential = {
        phone_no: this.login.value['phone_no'],
      };
      this.login.reset();
      this.userAuth.login(credential);
      if (localStorage.getItem('userAuth') !== null) {
        this.router.navigateByUrl('/restaurant');
      } else {
        alert('invalid credential');
      }
    }
  }
}
