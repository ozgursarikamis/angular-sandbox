import { Component, computed, effect, EffectRef, signal } from '@angular/core';
import { ProductData } from '../product-data';
import { Product } from '../product';

@Component({
  selector: 'app-product-selection',
  standalone: false,
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';
  quantity = signal(1);
  products = signal(ProductData.products);
  selectedProduct = signal<Product | undefined>(undefined);

  onDecrease() {
    this.quantity.update(value => value <= 0 ? 0 : value - 1);
  }

  onIncrease() {
    this.quantity.update(value => value + 1);
  }

  quantityEffect: EffectRef = effect(() => {
    console.log(`Quantity changed to ${this.quantity()}`);
  });

  // computed():
  // A `computed()` signal performs a computation
  // whenever dependent signals change

  total = computed(() => {
    return (this.selectedProduct()?.price ?? 0) * this.quantity();
  });

  color = computed(() => {
    return this.total() >= 100 ? 'green' : 'red';
  });
}
