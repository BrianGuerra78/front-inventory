import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlEndPoint: string = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getProducts(){//get all the products
    const endpoint = `${this.urlEndPoint}/products`;
    return this.http.get(endpoint);
  }

  saveProduct(body:any){
    const endpoint = `${this.urlEndPoint}/products`;
    return this.http.post(endpoint,body);
  }
}
