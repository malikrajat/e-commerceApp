import { createReducer, on } from "@ngrx/store";
import { Cart, cartActions } from "./cart.action";

export interface CartState {
  cart: Cart[];
  error: string
}

export const initialState: CartState = {
  cart: [],
  error: ''
}
export const cartReducer = createReducer(
  initialState,
  on(cartActions.cartSuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    error: ''
  })),
  on(cartActions.cartFailure, (state, action) => ({
    ...state,
    cart: [],
    error: action.error
  }))
)
