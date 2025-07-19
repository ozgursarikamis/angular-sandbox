import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/product';

  // productResource = httpResource<Product[]>(() => this.productsUrl); // HttpResourceRef<Product[] | undefined>
  // productResource: HttpResourceRef<Product[]> = httpResource<Product[]>(() => this.productsUrl, { defaultValue: [] }); // HttpResourceRef<Product[]>

  createProducts() {
    return httpResource<Product[]>(() => this.productsUrl, { defaultValue: [] });
  }
}
