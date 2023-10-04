import { Injectable } from '@angular/core';
import { map, timer } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  constructor() { }

  someData() {
    return timer(3000).pipe(
      map(() => {
        return {
          Name: 'Oz',
          Age: 25
        }
      })
    );
  }
}
