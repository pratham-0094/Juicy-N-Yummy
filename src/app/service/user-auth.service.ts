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

  getUser() {
    let authtoken = localStorage.getItem('userAuth') || '';
    const header = new HttpHeaders().set('auth-token', authtoken);
    return this.http.get<userProfile>('http://localhost:5000/auth/getuser', {
      headers: header,
    });
  }

  getAdminId(id: String) {
    return this.http.get<adminProfile>(
      'http://localhost:5000/auth/getadmin/' + id
    );
  }

  editUserProfile(credential: userProfile) {
    let authtoken = localStorage.getItem('userAuth') || '';
    const header = new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
    this.http
      .put('http://localhost:5000/auth/edit', credential, {
        headers: header,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
