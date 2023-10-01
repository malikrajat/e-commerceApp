import { createFeature, createFeatureSelector, createSelector, } from '@ngrx/store';
import { cartReducer, CartState } from "./cart.reducer";
// import { userFeature } from "@org/user";
import { Product, productFeature, userFeature } from "@org/common/store";

const cartFeatureKey = 'cart';

export const selectCartState =
	createFeatureSelector<CartState>(cartFeatureKey);

export const selectCart = createSelector(
	selectCartState,
	(state) => state.cart
);
export const selectCurrentCart = createSelector(
	selectCartState,
	(state) => state.currentCart
);
export const selectError = createSelector(
	selectCartState,
	(state) => state.error
);

export const cartFeature = createFeature({
	name: cartFeatureKey,
	reducer: cartReducer,
});

export const userCartSelector = createSelector(
	selectCurrentCart,
	userFeature.selectUser,
	productFeature.selectProducts,
	(cart, user, products) => {
		if (cart && user) {
			let newProduct: Product[] = [];
			const cartproduct = cart.products
				.map((p) => {
					const product = products.find(
						(product) => product.id === p.productId
					);
					if (product) {
						const productWithQuantity: Product = {
							...product,
							quantity: p.quantity,
						};
						newProduct = [productWithQuantity];
						return newProduct;
					} else {
						return [];
					}
				})
				.flat();
			return {
				...cart,
				user,
				ProductDetails: cartproduct,
			};
		}
		return undefined;
	}
);
