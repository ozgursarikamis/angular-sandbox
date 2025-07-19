import { Component, signal } from '@angular/core';
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
}
