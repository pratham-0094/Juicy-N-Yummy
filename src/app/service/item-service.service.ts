import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { items } from '../model/items';
import { review } from '../model/review';

@Injectable({
  providedIn: 'root',
})
export class ItemServiceService {
  constructor(private http: HttpClient) {}

  getItems(id: String) {
    return this.http.get<items[]>('http://localhost:5000/restaurant/get/' + id);
  }

  getReview(id: String) {
    return this.http.get<review[]>(
      'http://localhost:5000/restaurant/review/get/' + id
    );
  }

  addReview(reviews: any, id: String) {
    let authtoken = localStorage.getItem('userAuth') || '';
    const header = new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
    return this.http.post(
      'http://localhost:5000/restaurant/review/' + id,
      reviews,
      {
        headers: header,
      }
    );
  }

  removeReview(id: String) {
    let authtoken = localStorage.getItem('userAuth') || '';
    const header = new HttpHeaders()
      .set('content-Type', 'application/json')
      .set('auth-token', authtoken);
    return this.http.delete(
      'http://localhost:5000/restaurant/review/delete/' + id,
      { headers: header }
    );
  }
}
