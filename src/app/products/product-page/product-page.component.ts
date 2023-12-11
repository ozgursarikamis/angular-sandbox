import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { selectProductById, selectProductsLoading } from '../state/products.selectors';
import { ProductsPageActions } from '../state/products.actions';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  // product$ = this.store.select(selectProductById(this.activatedRoute.snapshot.params['id']));
  product$ = this.store.select(selectProductById);
  loading$ =  this.store.select(selectProductsLoading);

  constructor(
    // private productsService: ProductsService, // not needed after store dispatch
    // private router: Router, // not needed after store dispatch
    // private activatedRoute: ActivatedRoute, // not needed after store dispatch
    private store: Store
  ) {}

  addProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.addProduct({ product }));
    // this.productsService.add(product).subscribe(this.goToProductsPage);
  }

  updateProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.updateProduct({ product }));
    // this.productsService.update(product).subscribe(this.goToProductsPage);
  }

  deleteProduct(id: number) {
    this.store.dispatch(ProductsPageActions.deleteProduct({ id }));
    // this.productsService.delete(id).subscribe(this.goToProductsPage);
  }
}
