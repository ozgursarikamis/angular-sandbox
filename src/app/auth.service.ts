import { Injectable }     from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  permissions(): Observable<string[]> {
    return of(['standalone'])
  }
}
