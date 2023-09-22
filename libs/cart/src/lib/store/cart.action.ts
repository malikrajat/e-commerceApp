import { createActionGroup, props } from "@ngrx/store";

export interface Cart {
  id: number,
  date: Date,
  userId: number,
  product: [
    productId: number,
    quentity: number
  ]
}

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    LoadCart: props<{ cartId: number }>(),
    CartSuccess: props<{ cart: Cart[] }>(),
    CartFailure: props<{ error: string }>()
  }
})
