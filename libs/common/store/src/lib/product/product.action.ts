import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "./product";


export const productActions = createActionGroup({
	source: 'Product',
	events: {
		LoadProduct: emptyProps(),
		LoadProductByCategory: props<{ category: string }>(),
		ProductSuccess: props<{ products: Product[] }>(),
		ProductFailure: props<{ error: string }>()
	}
})
