import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { adminProfile } from '../model/adminProfile';
import { userLogin } from '../model/userLogin';
import { userProfile } from '../model/userProfile';
import { userSignup } from '../model/userSignup';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private baseUrl = 'https://juicynyummy.netlify.app/.netlify/functions/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders() {
    const authtoken = localStorage.getItem('userAuth') || '';
    return new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
  }

  signup(credential: userSignup) {
    return this.http.post(`${this.baseUrl}/signup`, credential, {
      headers: this.getHeaders(),
    }).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        localStorage.setItem('userAuth', response.authtoken);
        console.log(localStorage.getItem('userAuth'));
        this.router.navigateByUrl('/restaurant');
      } else {
        alert('Invalid credentials');
      }
    });
  }

  login(credential: userLogin) {
    return this.http.post(`${this.baseUrl}/login`, credential, {
      headers: this.getHeaders(),
    }).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        localStorage.setItem('userAuth', response.authtoken);
        console.log(localStorage.getItem('userAuth'));
        this.router.navigateByUrl('/restaurant');
      } else {
        alert('Invalid credentials');
      }
    });
  }

  getUser() {
    return this.http.get<userProfile>(`${this.baseUrl}/getuser`, {
      headers: this.getHeaders(),
    });
  }

  getAdminId(id: String) {
    return this.http.get<adminProfile>(`${this.baseUrl}/getadmin/${id}`);
  }

  editUserProfile(credential: userProfile) {
    return this.http.put(`${this.baseUrl}/edit`, credential, {
      headers: this.getHeaders(),
    }).subscribe((res) => {
      console.log(res);
    });
  }
}
