import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/productss';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);

  constructor(
    // private http: HttpClient
  ) {}

  getProdcuts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(data)),
        catchError(error => this.handleError(error))
      );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`)
      .pipe(
        tap(data => console.log(data))
      );
  }

  private handleError(err: any): Observable<never> {
    const formattedError = this.httpErrorService.formatError(err);
    return throwError(() => formattedError);
    // OR:
    // throw formattedError;
  }
}
