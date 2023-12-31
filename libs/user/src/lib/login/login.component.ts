import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { LoginService } from "../service/login.service";
import { Router } from "@angular/router";
// import { cartActions } from "@org/cart";
// import { userActions } from "../store/user.action";
import { Store } from "@ngrx/store";
import { cartActions, userActions } from "@org/common/store";

interface LoginInfo {
	username: string,
	password: string
}

@Component({
	selector: 'org-login',
	standalone: true,
	imports: [ReactiveFormsModule, MatInputModule, NgIf, MatButtonModule, JsonPipe, AsyncPipe, MatFormFieldModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	search: FormControl<string> = new FormControl();
	loginForm = this.fb.group({
		username: [
			// new FormControl<string>(
			'',
			{
				nonNullable: true,
				validators: [
					Validators.required,
					// Validators.email
				]
			}
			// )
		],
		password: new FormControl<string>(
			'',
			{
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(16)
				]
			}
		)
	})

	constructor(
		private readonly fb: FormBuilder,
		private readonly loginService: LoginService,
		private readonly router: Router,
		private store: Store,
	) {
	}

	login() {
		if (this.loginForm.valid) {
			this.loginService.login(
				(this.loginForm.get('username')?.value) as string,
				(this.loginForm.get('password')?.value) as string
			).subscribe({
				next: (response: { token: string }): void => {
					this.loginService.isLoggedIn = true;
					this.store.dispatch(userActions.loadUserProfile({id: 2}));
					this.store.dispatch(cartActions.loadCartById({id: 3}));
					console.log(response.token)
					this.router.navigate(['/product'])
						.then((response: boolean): void => {
							// it is just to update old controller like we have redirect successfully,
							// we have room to do memory clean up at this location
							console.log('you have been moved to other page', response)
						})
				},
				error: (err): void => {
					console.error(err)
				}
			})
		}
	}
}
