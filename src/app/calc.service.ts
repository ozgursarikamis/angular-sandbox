import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrls } from './strings';

@Injectable({ providedIn: 'root' })
export class CalcService {
  httpClient = inject(HttpClient);
  usersUrl = ApiUrls.Users;

  multiply(a: number, b: number): number {
    return a * b;
  }

  getUsers(): any {
    return this.httpClient.get(this.usersUrl);
  }
}
