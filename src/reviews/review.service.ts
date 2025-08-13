import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductService } from 'src/products/product.service';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';
  private productService: ProductService = inject(ProductService);

  reviewsResource = httpResource<Review[]>(() => `${this.reviewsUrl}?productId=^${this.productService.selectedProduct()?.id}$`, { defaultValue: [] });
}
