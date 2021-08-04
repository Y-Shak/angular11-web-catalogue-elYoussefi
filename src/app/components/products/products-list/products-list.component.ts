import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }
  hundleClickSelectProduct(p: Product) {

    this.productEventEmitter.emit({
      type: ProductActionTypes.SELECT_PRODUCT,
      playload: p
    });
  }
  hundleClickDelete(p: Product) {

    this.productEventEmitter.emit({
      type: ProductActionTypes.DELETE_PRODUCT,
      playload: p
    });
  }
  hundleClickEdit(p: Product) {

    this.productEventEmitter.emit({
      type: ProductActionTypes.EDIT_PRODUCT,
      playload: p
    });
  }

  onActionEvent($event: ActionEvent) {

    // on peut envoyer tous l event au parent grace a @Output()

    // switch ($event.type) {
    //   case ProductActionTypes.EDIT_PRODUCT: this.hundleClickEdit($event.playload); break;
    //   case ProductActionTypes.DELETE_PRODUCT: this.hundleClickDelete($event.playload); break;
    //   case ProductActionTypes.SELECT_PRODUCT: this.hundleClickSelectProduct($event.playload); break;

    // }

    this.productEventEmitter.emit($event);
  }

}
