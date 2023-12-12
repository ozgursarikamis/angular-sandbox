import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../product.model";
import { Update } from "@ngrx/entity";

export const ProductsPageActions = createActionGroup({
    source: 'Products Page',
    events: {
        'Toggle Show Product Code': emptyProps(),
        'Load Products': emptyProps(),
        'Add Product': props<{ product: Product }>(),
        'Update Product': props<{ product: Product }>(),
        'Delete Product': props<{ id: number }>()
    }
});

export const ProductsAPIActions = createActionGroup({
    source: 'Products API',
    events: {
        'Products Loaded Success': props<{ products: Product[] }>(),
        'Products Loaded Fail': props<{ message: string }>(),
        // Add Product:
        'Product Added Success': props<{ product: Product }>(),
        'Product Added Fail': props<{ message: string }>(),
        // Update Product:
        'Product Updated Success': props<{ update: Update<Product> }>(),
        'Product Updated Fail': props<{ message: string }>(),
        // Delete Product
        'Product Deleted Success': props<{ id: number }>(),
        'Product Deleted Fail': props<{ message: string }>(),
    }
});