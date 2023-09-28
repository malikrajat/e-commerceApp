import { createActionGroup, props } from "@ngrx/store";
import { Product } from "@org/product";

export interface Cart {
	id: number,
	date: Date,
	userId: number,
	product: Product[]
}

export const cartActions = createActionGroup({
	source: 'Cart',
	events: {
		LoadCart: props<{ cartId: number }>(),
		CartSuccess: props<{ cart: Cart[] }>(),
		CartFailure: props<{ error: string }>()
	}
})
