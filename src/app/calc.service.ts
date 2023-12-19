import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalcService {
  httpClient = inject(HttpClient);
  constructor(
  ) {
    // this.httpClient = httpClient;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  getUsers(): any {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }
}
