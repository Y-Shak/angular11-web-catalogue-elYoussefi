import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productFormGroup!: FormGroup;
  productId!: number;
  submitted: boolean = false;
  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private fb: FormBuilder) {
    this.productId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    // on recupere l'element pour remplir les champs 
    // puis on recupere les modifications 
    // dans le meme objet FormGroup 
    this.productService.getProductById(this.productId)
      .subscribe(
        (product) => {
          this.productFormGroup = this.fb.group({
            id: [product.id, Validators.required],
            name: [product.name, Validators.required],
            price: [product.price, [Validators.required, Validators.min(0)]],
            quantity: [product.quantity, [Validators.required, Validators.min(0)]],
            selected: [product.selected, Validators.required],
            available: [product.available, Validators.required]
          })
        }
      );
  }
  hundleSubmitEditProduct() {
    this.productService.updateProduct(this.productFormGroup.value)
      .subscribe(
        (data) => {
          alert("success updating product ");
        }
      );
  }

}
