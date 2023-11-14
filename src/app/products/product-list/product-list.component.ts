import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { Subscription, tap } from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage = '';
  sub: Subscription | undefined;

  private productService = inject(ProductService);

  // Products
  products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProdcuts()
    .pipe(
      tap(data => console.log("in component pipe")),
    )
    .subscribe(products => {
      this.products = products;
      console.log("in component subscribe", this.products);
    });
    console.log(this.products); // this is logged before the data is returned from the service
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
