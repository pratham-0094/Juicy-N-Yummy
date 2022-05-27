import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { items } from '../model/items';
import { newItem } from '../model/newItem';
import { review } from '../model/review';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private http: HttpClient) {}

  addItems(item: newItem) {
    let authtoken = localStorage.getItem('adminAuth') || '';
    const header = new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
    return this.http.post('http://localhost:5000/admin/restaurant/add', item, {
      headers: header,
    });
  }

  getItems(id: String) {
    return this.http.get<items[]>('http://localhost:5000/restaurant/get/' + id);
  }

  removeItems(id: String) {
    let authtoken = localStorage.getItem('adminAuth') || '';
    const header = new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
    return this.http.delete(
      'http://localhost:5000/admin/restaurant/delete/' + id,
      { headers: header }
    );
  }

  getReview(id: String) {
    return this.http.get<review[]>(
      'http://localhost:5000/restaurant/review/get/' + id
    );
  }

  removeReview(id: String) {
    let authtoken = localStorage.getItem('adminAuth') || '';
    const header = new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
    return this.http.delete(
      'http://localhost:5000/admin/restaurant/review/delete/' + id,
      { headers: header }
    );
  }

  category(category: any) {
    let authtoken = localStorage.getItem('adminAuth') || '';
    const header = new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
    this.http
      .put('http://localhost:5000/admin/auth/category', category, {
        headers: header,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
