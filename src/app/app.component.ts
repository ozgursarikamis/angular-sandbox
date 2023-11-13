import { Component } from '@angular/core';
import { Observable, filter, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RxJS and Angular Signals';
  of$: Observable<any>;

  constructor() {
    document.title = this.title;

    const arr = [2, 3, 4, 5, 6];

    this.of$ = of(...arr).pipe(
      filter(x => x % 2 === 0),
      tap(x => console.log(x))
    )
  }
}
