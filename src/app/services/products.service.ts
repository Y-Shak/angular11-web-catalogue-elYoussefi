import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    // pour tester l'app est la laisser tomber dans l'erreur
    // let host = (Math.random() > 0.2) ? environment.host : environment.unreachableHost;
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products");
  }
  getProductById(id: number): Observable<Product> {
    // pour tester l'app est la laisser tomber dans l'erreur
    // let host = (Math.random() > 0.2) ? environment.host : environment.unreachableHost;
    let host = environment.host;
    return this.http.get<Product>(host + "/products/" + id);
  }
  getSelectedProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?selected=true")
  }
  getAvailableProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?available=true")
  }
  searchProducts(keyword: string): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?name_like=" + keyword)
  }
  selectProduct(product: Product): Observable<Product> {
    let host = environment.host;
    product.selected = !product.selected;
    return this.http.put<Product>(host + "/products/" + product.id, product)
  }
  deleteProduct(product: Product): Observable<void> {
    let host = environment.host;
    product.selected = !product.selected;
    return this.http.delete<void>(host + "/products/" + product.id)
  }

  saveNewProduct(product: Product) {
    let host = environment.host;
    return this.http.post<Product>(host + "/products/", product)
  }
  updateProduct(product: Product) {
    let host = environment.host;
    return this.http.put<Product>(host + "/products/" + product.id, product)
  }

}
