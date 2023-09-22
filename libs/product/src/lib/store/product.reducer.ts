import { Product, productActions } from "./product.action";
import { createReducer, on } from "@ngrx/store";

export interface ProductState {
  products: Product[];
  productCount: number;
  error: string
}

export const initialState: ProductState = {
  products: [],
  productCount: 0,
  error: ''
}
export const productReducer = createReducer(
  initialState,
  on(productActions.productSuccess, (state, action) => ({
    ...state,
    products: action.products,
    productCount: action.products.length ?? 0,
    error: ''
  })),
  on(productActions.productFailure, (state, action) => ({
    ...state,
    product: [],
    productCount: 0,
    error: action.error
  }))
)
