import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// import { loadProducts, loadProductsByCategory, productFeature } from '@org/product';
// import { cartFeature, loadCart, loadCartbyId } from '@org/cart';
import { loginGuard } from "@org/user";
import {
	cartFeature,
	loadCart,
	loadCartbyId,
	loadProducts,
	loadProductsByCategory,
	productFeature
} from "@org/common/store";

export const appRoutes: Route[] = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: 'product',
		loadComponent: () => import('@org/product').then((m) => m.ProductComponent),
		title: 'product',
		providers: [
			provideState(cartFeature),
			provideState(productFeature),
			provideEffects({loadProducts}),
		],
		canMatch: [loginGuard]
	},
	{
		path: 'product/:categoryName',
		title: 'product',
		loadComponent: () => import('@org/product').then((m) => m.ProductComponent),
		data: {
			animation: 'CategoryPage',
		},
		providers: [
			provideState(productFeature),
			provideEffects({loadProducts, loadProductsByCategory}),
		],
		canMatch: [loginGuard]
	},
	{
		path: 'cart',
		title: 'cart',
		loadComponent: () => import('@org/cart').then((m) => m.CartComponent),
		providers: [provideState(cartFeature), provideEffects({loadCart, loadCartbyId})],
		canMatch: [loginGuard]
	},
	{
		path: 'login',
		title: 'login',
		loadComponent: () => import('@org/user').then((m) => m.LoginComponent),
	},
	{
		path: 'profile',
		title: 'Profile',
		loadComponent: () => import('@org/user').then((m) => m.ProfileComponent),
		canMatch: [loginGuard]
	},
	{
		path: '**',
		redirectTo: 'login',
	},
];
