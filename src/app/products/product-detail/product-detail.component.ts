import { Component, inject } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, catchError } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent {
  errorMessage = '';
  private productService = inject(ProductService);
  product$ = this.productService.product$
    .pipe(
      catchError(error => {
        this.errorMessage = error
        return EMPTY;
      })
    );

  // Set the page title
  // pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  pageTitle = 'Product Detail';

  cartService = inject(CartService);
  
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
