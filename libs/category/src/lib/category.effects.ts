import { Injectable } from "@angular/core";
import { categoryActionsFailure, categoryActionsSuccess, getCategoriesActions } from './category.action';
import { CategoryService } from './category.service';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, share } from 'rxjs/operators'
import { of } from "rxjs";

@Injectable()
export class CategoryEffects {
	loadCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getCategoriesActions),
			mergeMap(() =>
				this.categoryService.getCategories().pipe(
					map((categories) => categoryActionsSuccess(categories)),
					catchError(() => of(categoryActionsFailure('Error Occured')))
				)
			),
			share() // Share the effect among multiple subscribers
		)
	);

	constructor(
		private readonly categoryService: CategoryService,
		private readonly actions$: Actions
	) {
	}
}
