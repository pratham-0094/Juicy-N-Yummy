import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userLogin } from '../model/userLogin';
import { userSignup } from '../model/userSignup';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signup(credential: userSignup) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post('http://localhost:5000/auth/signup', credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        console.log(Response);
        if (Response.success) {
          localStorage.setItem('userAuth', Response.authtoken);
          console.log(localStorage.getItem('userAuth'));
          this.router.navigateByUrl('/restaurant');
        } else {
          alert('invalid credential');
        }
      });
  }

  login(credential: userLogin) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post('http://localhost:5000/auth/login', credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        console.log(Response);
        if (Response.success) {
          localStorage.setItem('userAuth', Response.authtoken);
          console.log(localStorage.getItem('userAuth'));
          this.router.navigateByUrl('/restaurant');
        } else {
          alert('invalid credential');
        }
      });
  }
}
