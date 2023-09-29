import { createAction } from "@ngrx/store";

export const getCategoriesActions = createAction('[category] Get Category');
export const categoryActionsSuccess = createAction(
	'[category], Get Category Success',
	(categories) => ({categories})
);
export const categoryActionsFailure = createAction(
	'[category], Get Category Error',
	(error) => ({error})
);

