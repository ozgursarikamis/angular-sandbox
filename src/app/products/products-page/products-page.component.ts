import { Component, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsTotal } from '../state/products.selectors';
import { ProductsStore } from '../products.store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [ProductsStore]
})
export class ProductsPageComponent {
  
  productStore = inject(ProductsStore);

  products$ = this.productStore.products$; // this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select((state: any) => state.products.showProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store) {
    this.store.subscribe((store) => console.log('State', store));
  }

  ngOnInit(): void {
    this.productStore.getProducts();
  }
  
  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
