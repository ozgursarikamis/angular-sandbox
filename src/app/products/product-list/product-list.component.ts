import { Component, OnInit, inject } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage = '';

  private productService = inject(ProductService);

  // Products
  products$: Observable<Product[]> | undefined;

  // Selected product id to highlight the entry
  readonly selectedProductId$ = this.productService.productSelected$;

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }

  ngOnInit(): void {
    this.products$  = this.productService.products$
    .pipe(
      tap(data => console.log("in component pipe", data)),
      catchError(error => {
        this.errorMessage = error
        return EMPTY;
      })
    ) // this is logged before the data is returned from the service
  }
}
