import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CategoryEffects, categoryFeature } from '@org/category';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loadUserProfile, userFeature } from "@org/common/store";
// import { loadUserProfile, userFeature } from "@org/user";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			appRoutes,
			// withInMemoryScrolling({
			// 	scrollPositionRestoration: 'enabled',
			// }),
			withEnabledBlockingInitialNavigation(),
			withComponentInputBinding()
		),
		provideHttpClient(withFetch()),
		provideAnimations(),
		provideStore(),
		provideState(categoryFeature),
		provideState(userFeature),
		provideEffects([CategoryEffects, {loadUserProfile}]),
		provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
	],
};
