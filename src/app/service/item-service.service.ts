import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { items } from '../model/items';
import { review } from '../model/review';

@Injectable({
  providedIn: 'root',
})
export class ItemServiceService {
  private baseUrl = 'https://juicynyummy.netlify.app/.netlify/functions/api/restaurant'; 

  constructor(private http: HttpClient) {}

  private getHeaders() {
    let authtoken = localStorage.getItem('userAuth') || '';
    return new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
  }

  getItems(id: String) {
    return this.http.get<items[]>(`${this.baseUrl}/get/${id}`);
  }

  getReview(id: String) {
    return this.http.get<review[]>(`${this.baseUrl}/review/get/${id}`);
  }

  addReview(reviews: any, id: String) {
    return this.http.post(
      `${this.baseUrl}/review/${id}`,
      reviews,
      { headers: this.getHeaders() }
    );
  }

  removeReview(id: String) {
    return this.http.delete(
      `${this.baseUrl}/review/delete/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
