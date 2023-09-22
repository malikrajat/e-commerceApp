import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Product, productActions } from "./product.action";
import { ProductService } from "../product.service";

export const loadProductsByCategory = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.loadProductByCategory),
      exhaustMap((action) =>
        productService.getProductByCategory(action.category).pipe(
          map((products: Product[]) => productActions.productSuccess({products})),
          catchError((error: { message: string }) =>
            of(productActions.productFailure({error: error.message}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const loadProducts = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.loadProduct),
      exhaustMap(() =>
        productService.getProducts().pipe(
          map((products: Product[]) => productActions.productSuccess({products})),
          catchError((error: { message: string }) =>
            of(productActions.productFailure({error: error.message}))
          )
        )
      )
    );
  },
  {functional: true}
);
