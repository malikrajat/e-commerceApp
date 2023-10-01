import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { ProductState } from "./product";
import { productActions } from "./product.action";


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
const productFeatureKey = 'product';

export const productFeature = createFeature({
	name: productFeatureKey,
	reducer: productReducer,
	extraSelectors: ({selectProducts, selectProductCount, selectError}) => ({
		selectProducts,
		selectProductCount,
		selectError,
		filterProductsByCategory: (category: string) =>
			createSelector(selectProducts, (products) =>
				products.filter((product) => product.category === category)
			),
	}),
});
