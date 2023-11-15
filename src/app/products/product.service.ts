import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, filter, map, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  constructor(
    // private http: HttpClient
  ) { }

  private products$: Observable<Product[]> = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      shareReplay(1),
      tap(() => console.log('AFTER `shareReplay`')),
      catchError(error => this.handleError(error))
    );

  // products = toSignal(this.products$, { initialValue: [] as Product[] });
  products = computed(() => {
    try {
      return toSignal(this.products$, { initialValue: [] as Product[] })();
    } catch (error) {
      return [];
    }
  });

  product$ = combineLatest([
    this.productSelected$,
    this.products$
  ]).pipe(
    map(([selectedProductId, products]) => products.find(product => product.id === selectedProductId)),
    filter(Boolean),
    switchMap(product => this.getProductsWithReviews(product)),
    catchError(error => this.handleError(error))
  );

  productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
  }

  private getProductsWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http.get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(
          map(reviews => ({ ...product, reviews } as Product))
        );
    } else {
      return of(product);
    }
  }

  private handleError(err: any): Observable<never> {
    const formattedError = this.httpErrorService.formatError(err);
    return throwError(() => formattedError);
    // OR:
    // throw formattedError;
  }
}
