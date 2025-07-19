import { Component, signal } from '@angular/core';
import { ProductData } from '../product-data';

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
  selectedProduct = signal(undefined);
}
