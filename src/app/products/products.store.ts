import { Injectable, inject } from "@angular/core";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";
import { ComponentStore } from "@ngrx/component-store";
import { exhaustMap, tap } from "rxjs";

interface ProductState {
    products: Product[];
}

@Injectable()
export class ProductsStore extends ComponentStore<ProductState> {
    products$ = this.select((state) => state.products);
    productService = inject(ProductsService);

    constructor() {
        super({ products: [] });
    }

    addProducts = this.updater((state, products: Product[]) => ({
        ...state,
        products
    }));

    getProducts = this.effect((trigger$) =>
        trigger$.pipe(
            exhaustMap(() => this.productService.getAll().pipe(
                tap({ next: (products) => this.addProducts(products) })
            ))
        )
    );
}