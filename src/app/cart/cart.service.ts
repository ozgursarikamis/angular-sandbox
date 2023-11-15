import { Injectable, computed, effect, signal } from "@angular/core";
import { CartItem } from "./cart";
import { Product } from "../products/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  subTotal = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  deliveryFee = computed(() => {
    return this.subTotal() < 50 ? 5.99 : 0;
  });

  tax = computed(() => {
    return Math.round(this.subTotal() * 10.75) / 100;
  });

  totalPrice = computed(() => {
    return this.subTotal() + this.deliveryFee() + this.tax();
  });

  eLengthEffect = effect(() => console.log('Cart array length:', this.cartItems().length));

  addToCart(product: Product): void {
    // this is a signal, so we can't just push to it
    // this.cartItems().push({ product, quantity: 1 });
    this.cartItems.update(items => [...items, { product, quantity: 1 }]);
  }
}
