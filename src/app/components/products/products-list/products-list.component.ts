import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  // @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  readonly DataStateEnum = DataStateEnum;

  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
  }


}
