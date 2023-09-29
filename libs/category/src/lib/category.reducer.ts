import { createReducer, on } from "@ngrx/store";
import { categoryActionsFailure, categoryActionsSuccess } from "./category.action";

export interface CategoryState {
	categories: string[],
	currentCategory: '',
	error: string
}

const initialState: CategoryState = {
	categories: [],
	currentCategory: '',
	error: ''
}
export const categoryReducer = createReducer(
	initialState,
	on(categoryActionsSuccess, (state: CategoryState, action) => {
		return {
			...state,
			categories: action.categories,
			error: ''
		}
	}),
	on(categoryActionsFailure, (state: CategoryState, action) => {
		return {
			...state,
			category: [],
			error: action.error
		}
	})
)



