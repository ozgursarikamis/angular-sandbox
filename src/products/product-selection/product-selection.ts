import { Component, computed, effect, EffectRef, linkedSignal, signal } from '@angular/core';
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

  // A `linkedSignal()` creates a writable signal
  // that automatically resets when dependant signals change.
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: (product) => {
      console.log(`selection changed to`, product);
      return 1;
    } // reset the quantity if selected product changes
  });
}
