import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup!: FormGroup;
  submitted: Boolean = false;

  constructor(private fb: FormBuilder,
    private eventDrivenService: EventDriverService,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ["", Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      selected: [false, Validators.required],
      available: [false, Validators.required]
    });
  }
  hundleSubmitAddProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.productService.saveNewProduct(this.productFormGroup.value)
      .subscribe(
        (data) => {
          this.eventDrivenService.publishEvent({
            type: ProductActionTypes.PRODUCT_SAVED
          });
          alert("success saving product");
        }
      );
    console.log("enrister")
  }

}
