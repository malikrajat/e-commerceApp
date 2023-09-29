import { createActionGroup, props } from "@ngrx/store";
import { Product } from "@org/product";
import { User } from "@org/user";

export interface CartProduct {
	productId: number;
	quantity: number;
}

export interface Cart {
	id: number;
	userId: number;
	date: Date;
	user?: User;
	products: CartProduct[];
	ProductDetails: Product[];
}

export const cartActions = createActionGroup({
	source: 'Cart',
	events: {
		LoadCart: props<{ cartId: number }>(),
		CartSuccess: props<{ cart: Cart[] }>(),
		CartFailure: props<{ error: string }>(),
		loadCartById: props<{ id: number }>(),
		cartByIdSuccess: props<{ cart: Cart }>(),
		cartByIdFailure: props<{ error: string }>(),
		addProductToCart: props<{ product: Product }>(),
	}
})
