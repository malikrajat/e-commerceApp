import { createFeature, createFeatureSelector, createSelector, } from '@ngrx/store';
import { cartReducer, CartState } from "./cart.reducer";

const cartFeatureKey = 'cart';

export const selectCartState =
	createFeatureSelector<CartState>(cartFeatureKey);

export const selectCart = createSelector(
	selectCartState,
	(state) => state.cart
);

export const selectError = createSelector(
	selectCartState,
	(state) => state.error
);

export const cartFeature = createFeature({
	name: cartFeatureKey,
	reducer: cartReducer,
});
