import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Cart, cartActions } from "./cart.action";
import { CartService } from "../cart.service";
import { share } from "rxjs/operators";


export const loadCart = createEffect(
	(actions$ = inject(Actions), cartService = inject(CartService)) => {
		return actions$.pipe(
			ofType(cartActions.loadCart),
			exhaustMap((action) =>
				cartService.getCart(action.cartId).pipe(
					map((cart: Cart[]) => cartActions.cartSuccess({cart})),
					catchError((error: { message: string }) =>
						of(cartActions.cartFailure({error: error.message}))
					)
				)
			),
			share() // Share the effect among multiple subscribers
		);
	},
	{functional: true}
);
