import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, filter, of, tap } from 'rxjs';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RxJS and Angular Signals';
  of$: Observable<any>;

  private cartService = inject(CartService);
  cartCount = this.cartService.cartCount;

  constructor() {
    document.title = this.title;

    const arr = [2, 3, 4, 5, 6];

    this.of$ = of(...arr).pipe(
      filter(x => x % 2 === 0),
      tap(x => console.log(x))
    )
  }
}
