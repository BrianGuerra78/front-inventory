import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   private urlEndPoint: string = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getCategories(){//get all categories
    const endpoint = `${this.urlEndPoint}/categories`;
    return this.http.get(endpoint);
  }
}
