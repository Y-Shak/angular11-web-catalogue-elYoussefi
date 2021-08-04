import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, DataStateEnum, ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;

  // @Output() itemProductEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
  }

  hundleClickSelectProduct(p: Product) {

    // this.itemProductEventEmitter.emit({
    //   type: ProductActionTypes.SELECT_PRODUCT,
    //   playload: p
    // });
    this.eventDrivenService.publishEvent({
      type: ProductActionTypes.SELECT_PRODUCT,
      playload: p
    });
  }
  hundleClickDelete(p: Product) {
    // this.itemProductEventEmitter.emit({
    //   type: ProductActionTypes.DELETE_PRODUCT,
    //   playload: p
    // });
    this.eventDrivenService.publishEvent({
      type: ProductActionTypes.DELETE_PRODUCT,
      playload: p
    });
  }
  hundleClickEdit(p: Product) {

    // this.itemProductEventEmitter.emit({
    //   type: ProductActionTypes.EDIT_PRODUCT,
    //   playload: p
    // });

    this.eventDrivenService.publishEvent({
      type: ProductActionTypes.EDIT_PRODUCT,
      playload: p
    });

  }

}
