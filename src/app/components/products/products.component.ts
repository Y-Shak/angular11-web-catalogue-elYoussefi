import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from "rxjs/operators";
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
  }
  hundleClickGetAllProducts() {
    this.products$ = this.productService.getAllProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))

      );
  }
  hundleClickGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))

      );
  }
  hundleClickGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))

      );
  }
  onSubmitSearchProduct(f: NgForm) {
    console.log(f.value['keyword']);
    this.products$ = this.productService.searchProducts(f.value['keyword'])
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))

      );
  }
  hundleClickSelectProduct(p: Product) {
    this.productService.selectProduct(p)
      .subscribe(
        (data) => {
          p.selected = data.selected;
        }
      )
  }
  hundleClickDelete(p: Product) {
    let v = confirm("Etes vous sûre ? ");
    if (v) {
      this.productService.deleteProduct(p)
        .subscribe(
          data => {
            this.hundleClickGetAllProducts();
          }
        )
    }
  }
  hundleClickAddProduct() {
    this.router.navigate(['/newProduct']);
  }
  hundleClickEdit(p: Product) {
    this.router.navigate(['/editProduct/' + p.id]);

  }
}
