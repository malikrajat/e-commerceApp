import { CanMatchFn, Router } from "@angular/router";
import { LoginService } from "./service/login.service";
import { inject } from "@angular/core";

export const loginGuard: CanMatchFn = (route, state) => {
	// const loginService: LoginService = route.injector.get(LoginService);
	const isLoggedIn: boolean = inject(LoginService).isLoggedIn;
	const router: Router = inject(Router);
	if (isLoggedIn) {
		return true
	}
	return router.navigate(['/login']);
	// return inject(LoginService).isLoggedIn;
};
