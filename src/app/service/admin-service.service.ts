import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { items } from '../model/items';
import { newItem } from '../model/newItem';
import { review } from '../model/review';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  private baseUrl = 'http://localhost:5000/admin';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const authtoken = localStorage.getItem('adminAuth') || '';
    return new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
  }

  addItems(item: FormData) {
    const headers = this.getHeaders().delete('content-Type'); 
    return this.http.post(`${this.baseUrl}/restaurant/add`, item, { headers });
  }

  getItems() {
    return this.http.get<items[]>(`${this.baseUrl}/restaurant/get`, {
      headers: this.getHeaders(),
    });
  }

  removeItems(id: String) {
    return this.http.delete(`${this.baseUrl}/restaurant/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getReview(id: String) {
    return this.http.get<review[]>(`${this.baseUrl}/restaurant/review/${id}`);
  }

  removeReview(id: String) {
    return this.http.delete(`${this.baseUrl}/restaurant/review/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }

  category(category: any) {
    return this.http.put(`${this.baseUrl}/auth/category`, category, {
      headers: this.getHeaders(),
    }).subscribe((res) => {
      console.log(res);
    });
  }
}
