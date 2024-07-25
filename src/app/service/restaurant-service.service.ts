import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { items } from '../model/items';

@Injectable({
  providedIn: 'root',
})
export class RestaurantServiceService {
  private baseUrl = 'http://localhost:5000/restaurant'; 
  constructor(private http: HttpClient) {}

  getAll(page: any) {
    return this.http.get<items[]>(`${this.baseUrl}/get`, {
      params: { page }
    });
  }

  getByOrigin(origin: String, page: any) {
    return this.http.get<items[]>(`${this.baseUrl}/region/${origin}`, {
      params: { page }
    });
  }

  // getByCategory(category: String) {
  //   return this.http.get<items[]>(
  //     `${this.baseUrl}/category/` + category
  //   );
  // }
}
