import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { adminAuthLogin } from '../model/adminAuthLogin';
import { adminAuthSignup } from '../model/adminAuthSignup';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signup(credential: adminAuthSignup) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post('http://localhost:5000/admin/auth/signup', credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        console.log(Response);
        if (Response.success) {
          localStorage.setItem('adminAuth', Response.authtoken);
          console.log(localStorage.getItem('adminAuth'));
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          alert('invalid credential');
        }
      });
  }

  login(credential: adminAuthLogin) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post('http://localhost:5000/admin/auth/login', credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        console.log(Response);
        if (Response.success) {
          localStorage.setItem('adminAuth', Response.authtoken);
          console.log(localStorage.getItem('adminAuth'));
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          alert('invalid credential');
        }
      });
  }
}
