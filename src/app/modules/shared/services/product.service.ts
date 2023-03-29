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

  saveProduct(body:any){//save product
    const endpoint = `${this.urlEndPoint}/products`;
    return this.http.post(endpoint,body);
  }

  updateProduct(body:any, id:any){//update product
    const endpoint = `${this.urlEndPoint}/products/${id}`;
    return this.http.put(endpoint,body);
  }

  deleteProduct(id: any){//delete product
    const endpoint = `${this.urlEndPoint}/products/${id}`;
    return this.http.delete(endpoint);
  }

  getProductByName(name: any){//search by name
    const endpoint = `${this.urlEndPoint}/products/filter/${name}`;
    return this.http.get(endpoint);
  }

  exportProducts(){// exportrt excel products
    const endpoint = `${this.urlEndPoint}/products/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}
