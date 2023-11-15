import { Component, computed, inject } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
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
  product = this.productService.product;
  // Set the page title
  // pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  pageTitle = computed(() => this.product() ? `Details for ${this.product()?.productName}` : 'Product Detail');

  cartService = inject(CartService);
  
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
