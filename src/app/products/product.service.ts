import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, map, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

import { toSignal } from '@angular/core/rxjs-interop';

import { IResult } from '../utilities/IResult';

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
  selectedProductId = signal<number | undefined>(undefined);
  constructor(
    // private http: HttpClient
  ) { }

  private productsResult$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      map(p => ({ data: p } as IResult<Product[]>)),
      tap(data => console.log(JSON.stringify(data))),
      shareReplay(1),
      tap(() => console.log('AFTER `shareReplay`')),
      catchError(error => of({
        data: [],
        error: this.httpErrorService.formatError(error)
      } as IResult<Product[]>)),
    );

  // products = toSignal(this.products$, { initialValue: [] as Product[] });

  private productsResult = toSignal(this.productsResult$,
    { initialValue: ({ data: [] } as IResult<Product[]>) });

  products = computed(() => this.productsResult().data);
  productError = computed(() => this.productsResult().error);

  // product$ = combineLatest([
  //   this.productSelected$,
  //   this.products
  // ]).pipe(
  //   map(([selectedProductId, products]) => products.find(product => product.id === selectedProductId)),
  //   filter(Boolean),
  //   switchMap(product => this.getProductsWithReviews(product)),
  //   catchError(error => this.handleError(error))
  // );

  product$ = this.productSelected$
    .pipe(
      filter(Boolean),
      switchMap(id => {
        const productUrl = this.productsUrl + '/' + id;
        return this.http.get<Product>(productUrl)
          .pipe(
            switchMap(product => this.getProductsWithReviews(product)),
            catchError(error => this.handleError(error))
          );
      })
    );

  productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
    this.selectedProductId.set(selectedProductId);
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
