import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, ProductActionTypes } from 'src/app/state/product.state';
// import * as EventEmitter from 'events';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  // @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
  }
  hundleClickGetAllProducts() {
    // this.productEventEmitter.emit({type: ProductActionTypes.GET_ALL_PRODUCTS});
    this.eventDrivenService.publishEvent({ type: ProductActionTypes.GET_ALL_PRODUCTS })
  }
  hundleClickGetSelectedProducts() {

    // this.productEventEmitter.emit({type: ProductActionTypes.GET_SELECTED_PRODUCTS});
    this.eventDrivenService.publishEvent({ type: ProductActionTypes.GET_SELECTED_PRODUCTS })
  }
  hundleClickGetAvailableProducts() {

    // this.productEventEmitter.emit({type: ProductActionTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDrivenService.publishEvent({ type: ProductActionTypes.GET_AVAILABLE_PRODUCTS })
  }
  hundleClickAddProduct() {

    // this.productEventEmitter.emit({type: ProductActionTypes.NEW_PRODUCT});
    this.eventDrivenService.publishEvent({ type: ProductActionTypes.NEW_PRODUCT })
  }
  onSubmitSearchProduct(form: NgForm) {

    // this.productEventEmitter.emit({type: ProductActionTypes.SEARCH_PRODUCTS,playload: form});
    this.eventDrivenService.publishEvent({ type: ProductActionTypes.SEARCH_PRODUCTS, playload: form })
  }
}
