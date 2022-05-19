import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userLogin } from '../model/userLogin';
import { userSignup } from '../model/userSignup';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}

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
        }
      });
  }
}
