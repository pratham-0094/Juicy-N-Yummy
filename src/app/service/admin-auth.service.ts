import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { adminAuthLogin } from '../model/adminAuthLogin';
import { adminAuthSignup } from '../model/adminAuthSignup';
import { adminProfile } from '../model/adminProfile';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private baseURL: string = 'https://juicynyummy.netlify.app/.netlify/functions/api/admin/auth';

  constructor(private http: HttpClient, private router: Router) {}

  signup(credential: adminAuthSignup) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    this.http
      .post(`${this.baseURL}/signup`, credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        console.log(Response);
        if (Response.success) {
          localStorage.setItem('adminAuth', Response.authtoken);
          console.log(localStorage.getItem('adminAuth'));
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          alert('Invalid credentials');
        }
      });
  }

  login(credential: adminAuthLogin) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    this.http
      .post(`${this.baseURL}/login`, credential, {
        headers: header,
      })
      .subscribe((Response: any) => {
        console.log(Response);
        if (Response.success) {
          localStorage.setItem('adminAuth', Response.authtoken);
          console.log(localStorage.getItem('adminAuth'));
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          alert('Invalid credentials');
        }
      });
  }

  getAdmin() {
    let authtoken = localStorage.getItem('adminAuth') || '';
    const header = new HttpHeaders().set('auth-token', authtoken);
    return this.http.get<adminProfile>(`${this.baseURL}/getadmin`, {
      headers: header,
    });
  }

  editAdminProfile(credential: any) {
    let authtoken = localStorage.getItem('adminAuth') || '';
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('auth-token', authtoken);
    this.http
      .put(`${this.baseURL}/edit`, credential, {
        headers: header,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  addCategory(category: String) {
    let authtoken = localStorage.getItem('adminAuth') || '';
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('auth-token', authtoken);
    this.http
      .put(`${this.baseURL}/edit`, category, {
        headers: header,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
