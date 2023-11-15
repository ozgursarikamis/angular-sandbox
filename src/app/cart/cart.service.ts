import { Injectable, effect, signal } from "@angular/core";
import { CartItem } from "./cart";
import { Product } from "../products/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  eLengthEffect = effect(() => console.log('Cart array length:', this.cartItems().length));

  addToCart(product: Product): void {
    // this is a signal, so we can't just push to it
    // this.cartItems().push({ product, quantity: 1 });
    this.cartItems.update(items => [...items, { product, quantity: 1 }]);
  }
}
