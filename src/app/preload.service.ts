import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  constructor() { }

  someData() {
    return {
      Name: 'Oz',
      Age: 25
    }
  }
}
