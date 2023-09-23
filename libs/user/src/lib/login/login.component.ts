import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

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
		username: new FormControl<string>(
			'',
			{
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.email
				]
			}
		),
		password: new FormControl<string>(
			'',
			{
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.minLength(6),
					Validators.maxLength(8)
				]
			}
		)
	})

	constructor(
		private readonly fb: FormBuilder
	) {
	}

	login() {

	}
}
