import { createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface ProductsState extends EntityState<Product> {
    showProductCode: boolean;
    loading: boolean;
    // products: Product[]; // we no longer manage product array!
    // ids: string[] | number[];
    // entites: Dictionary<T>
    errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

export const initialState: ProductsState = adapter.getInitialState({
    showProductCode: true,
    loading: false,
    // products: [],
    errorMessage: ''
});

export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode
    })),
    
    on(ProductsPageActions.loadProducts, state => adapter.setAll([], {
        ...state,
        loading: true,
        errorMessage: '',
    })),

    on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => adapter.setAll(products, {
        ...state,
        loading: false,
    })),

    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => 
        adapter.setAll([], { ...state, errorMessage: message, loading: false })
    ),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true
    })),
    on(ProductsAPIActions.productAddedSuccess, (state, { product }) => adapter.setOne(product, { ...state, loading: false }) ),
    on(ProductsAPIActions.productAddedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsPageActions.updateProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsAPIActions.productUpdatedSuccess, (state, { update }) => adapter.updateOne(update, {
        ...state,
        loading: false,
    })),
    on(ProductsAPIActions.productUpdatedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsAPIActions.productDeletedSuccess, (state, { id }) => adapter.removeOne(id, {
        ...state,
        loading: false
    })),
    on(ProductsAPIActions.productDeletedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    }))
);

const {  
    selectAll, selectEntities
} = adapter.getSelectors();

export const selectProducts = selectAll;
export const selectProductsEntities = selectEntities;