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

  saveCategorie(body: any){//save the categories
    const endpoint = `${this.urlEndPoint}/categories`;
    return this.http.post(endpoint,body);
  }

  updateCategorie(body:any, id:any){//update categories
    const endpoint = `${this.urlEndPoint}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteCategorie(id:any){//delete categories
    const endpoint = `${this.urlEndPoint}/categories/${id}`;
    return this.http.delete(endpoint);
  }
  
}
