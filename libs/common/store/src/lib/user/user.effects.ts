import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './user.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserService } from "./user.service";


export const loadUserProfile = createEffect(
	(actions$ = inject(Actions), userService = inject(UserService)) => {
		return actions$.pipe(
			ofType(userActions.loadUserProfile),
			exhaustMap((action) =>
				userService.getUserById(action.id).pipe(
					map((user) => {
						return userActions.loadUserProfileSuccess({user})
					}),
					catchError((error) => of(userActions.loadUserProfileFailure({error})))
				)
			)
		);
	},
	{functional: true}
);
