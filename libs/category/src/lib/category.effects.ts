import { Injectable } from "@angular/core";
import { categoryActionsFailure, categoryActionsSuccess, CategoryService, getCategoriesActions } from "@org/category";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from 'rxjs/operators'
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
            )
        )
    );

    constructor(
        private readonly categoryService: CategoryService,
        private readonly actions$: Actions
    ) {
    }
}
