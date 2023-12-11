import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";

@Injectable()
export class ProductEffects {

    actions$ = inject(Actions);
    productService = inject(ProductsService);
    
    loadProducts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsPageActions.loadProducts),
            exhaustMap(() => this.productService.getAll().pipe(
                map((products) => ProductsAPIActions.productsLoadedSuccess({ products }))
            )),
            catchError(err => {
                return of(ProductsAPIActions.productsLoadedFail({ message: err }))
            })
        )
    );

    addProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsPageActions.addProduct),
            mergeMap(( { product }) => this.productService.add(product).pipe(
                map((newProduct) => ProductsAPIActions.productAddedSuccess({ product: newProduct }))
            )),
            catchError(err => {
                return of(ProductsAPIActions.productAddedFail({ message: err }))
            })
        )
    )
    
    updateProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsPageActions.addProduct),
            // concatMap: Wait until the first update finishes.
            concatMap(( { product }) => this.productService.update(product).pipe(
                map(() => ProductsAPIActions.productUpdatedSuccess({ product }))
            )),
            catchError(err => {
                return of(ProductsAPIActions.productUpdatedFail({ message: err }))
            })
        )
    );

    deleteProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsPageActions.deleteProduct),
            // mergeMap: it's OK to delete products in parallel.
            mergeMap(({ id }) => this.productService.delete(id).pipe(
                map(() => ProductsAPIActions.productDeletedSuccess({ id }))
            )),
            catchError(err => {
                return of(ProductsAPIActions.productDeletedFail({ message: err }))
            })
        )
    );
}