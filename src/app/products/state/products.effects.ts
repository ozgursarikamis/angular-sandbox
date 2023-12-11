import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { concatMap, map } from "rxjs";

@Injectable()
export class ProductEffects {

    actions$ = inject(Actions);
    productService = inject(ProductsService);
    
    loadProducts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsPageActions.loadProducts),
            concatMap(() => this.productService.getAll().pipe(
                map((products) => ProductsAPIActions.productsLoadedSuccess({ products }))
            ))
        )
    );
}