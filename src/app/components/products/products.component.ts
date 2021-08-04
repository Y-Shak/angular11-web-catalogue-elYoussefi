import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from "rxjs/operators";
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productService: ProductsService,
    private eventDrivenService: EventDriverService,
    private router: Router) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe(
      ($event: ActionEvent) => {
        this.onActionEvent($event);
        // switch ($event.type) {
        //   case ProductActionTypes.GET_ALL_PRODUCTS: this.hundleClickGetAllProducts(); break;
        //   case ProductActionTypes.GET_SELECTED_PRODUCTS: this.hundleClickGetSelectedProducts(); break;
        //   case ProductActionTypes.GET_AVAILABLE_PRODUCTS: this.hundleClickGetAvailableProducts(); break;
        //   case ProductActionTypes.SEARCH_PRODUCTS: this.onSubmitSearchProduct($event.playload); break;
        //   case ProductActionTypes.NEW_PRODUCT: this.hundleClickAddProduct(); break;
        //   case ProductActionTypes.EDIT_PRODUCT: this.hundleClickEdit($event.playload); break;
        //   case ProductActionTypes.DELETE_PRODUCT: this.hundleClickDelete($event.playload); break;
        //   case ProductActionTypes.SELECT_PRODUCT: this.hundleClickSelectProduct($event.playload); break;

        // }
      }
    )
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
  hundleClickAddProduct() {
    this.router.navigate(['/newProduct']);
  }

  // methodes in list-component 
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
  hundleClickEdit(p: Product) {
    this.router.navigate(['/editProduct/' + p.id]);

  }


  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionTypes.GET_ALL_PRODUCTS: this.hundleClickGetAllProducts(); break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS: this.hundleClickGetSelectedProducts(); break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS: this.hundleClickGetAvailableProducts(); break;
      case ProductActionTypes.SEARCH_PRODUCTS: this.onSubmitSearchProduct($event.playload); break;
      case ProductActionTypes.NEW_PRODUCT: this.hundleClickAddProduct(); break;
      case ProductActionTypes.EDIT_PRODUCT: this.hundleClickEdit($event.playload); break;
      case ProductActionTypes.DELETE_PRODUCT: this.hundleClickDelete($event.playload); break;
      case ProductActionTypes.SELECT_PRODUCT: this.hundleClickSelectProduct($event.playload); break;

    }
  }
}
