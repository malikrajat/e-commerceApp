import { createReducer, on } from "@ngrx/store";
import { Cart, cartActions } from "./cart.action";

export interface CartState {
	cart: Cart[];
	currentCart: Cart;
	error: string;
}

const initialState: CartState = {
	cart: [],
	currentCart: {
		id: 0,
		userId: 0,
		date: new Date(),
		products: [],
		ProductDetails: [],
	},
	error: '',
};
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
		products: [],
		productCount: 0,
		error: action.error
	})),
	on(cartActions.cartByIdSuccess, (state, action) => ({
		...state,
		currentCart: action.cart,
		error: ''
	})),
	on(cartActions.cartByIdFailure, (state, action) => ({
		...state,
		currentCart: initialState.currentCart,
		error: action.error
	})),
	on(cartActions.addProductToCart, (state, action) => {
		console.log(` 🚀 👍 👏 ~File: cart.reducer.ts ~ at line 46:`, state, `state`);
		let product = [];
		if (
			state.currentCart.products.filter(
				(p: any) => p.productId === action.product.id
			).length > 0
		) {
			product = state.currentCart.products.map((p: any) => {
				if (p.productId === action.product.id) {
					return {
						...p,
						quantity: p.quantity + 1,
					};
				}
				return p;
			});
		} else {
			product = [
				...state.currentCart.products,
				{
					productId: action.product.id,
					quantity: 1,
				},
			];
		}

		return {
			...state,
			cart: [...state.cart],
			error: '',
			currentCart: {
				...state.currentCart,
				products: product,
			},
		};
	})
)
