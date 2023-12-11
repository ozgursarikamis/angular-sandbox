# `@ngrx/entity` 

- `@ngrx/entity` provides a set of functions and classes for manipulating and selecting entity collections.
- Entity State Adapter are for managing record collections.
- They provide a standardized way to store collections of records in the store.
- Entity State Adapter are useful for managing any kind of record collection.

## Why Use Entity State Adapter?

- Reduce boilerplate forecreaing reducers and selectors.
- Performant CRUD operations
- Type-safe selectors

## What is an Entity?

```ts
export interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 }
]
```

in reducer:

```ts
export interface State extends EntityState<Product> {
    showProductCode: boolean;
    loading: boolean;
    errorMessage: string;
    products: Product[];
}
```

## Products Dictionary vs Array

```ts
export interface Product {
  id: number;
  name: string;
  price: number;
}

// Entity structure:
export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;

  ids: string[] | number[];
  entites: Dictionary<Product>
}
```

```ts
// Entity Adapter:
export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}
```