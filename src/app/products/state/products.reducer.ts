import { createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductsState {
    showProductCode: boolean;
    loading: boolean;
    products: Product[];
    errorMessage: string;
}

export const initialState: ProductsState = {
    showProductCode: true,
    loading: false,
    products: [],
    errorMessage: ''
}

export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode
    })),
    on(ProductsPageActions.loadProducts, state => ({
        ...state,
        loading: true,
    })),
    on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        products
    })),
    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
        ...state,
        products: [],
        errorMessage: message,
        loading: false,
    })),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true
    })),
    on(ProductsAPIActions.productAddedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: [...state.products, product]
    })),
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
    on(ProductsAPIActions.productUpdatedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products.map((existingProduct) => {
            return existingProduct.id === product.id ? product : existingProduct
        })
    })),
    on(ProductsAPIActions.productUpdatedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    }))
);