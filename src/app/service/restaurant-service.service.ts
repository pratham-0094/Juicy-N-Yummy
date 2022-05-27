import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { items } from '../model/items';

@Injectable({
  providedIn: 'root',
})
export class RestaurantServiceService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<items>('http://localhost:5000/restaurant/get');
  }

  getByOrigin(origin: String) {
    return this.http.get<items>(
      'http://localhost:5000/restaurant/region/' + origin
    );
  }
  
  getByCategory(category: String) {
    return this.http.get<items>(
      'http://localhost:5000/restaurant/category/' + category
    );
  }
}
