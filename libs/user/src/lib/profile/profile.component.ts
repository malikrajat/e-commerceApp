import { Component, computed, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
// import { UserService } from "../../../../common/store/src/lib/user/user.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { UserService } from "@org/common/store";

@Component({
	selector: 'org-profile',
	standalone: true,
	imports: [
		JsonPipe,
		ReactiveFormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,],
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	// user$ = this.userService.getUser();
	// user: WritableSignal<any> = signal({});
	// user: Signal<User | undefined> = toSignal(this.userService.getUser());
	// user = signal({});

	user = toSignal(this.userService.getUser());

	fullName = computed(
		() => this.user()?.name.firstname + ' ' + this.user()?.name.lastname
	);

	profileForm!: FormGroup;

	constructor(private userService: UserService, private fb: FormBuilder) {
	}

	get addresses() {
		return this.profileForm.get('address') as FormArray;
	}

	ngOnInit() {
		this.profileForm = this.fb.group({
			id: new FormControl({value: '', disabled: true}, Validators.required),
			email: ['', Validators.required],
			phone: '',
			name: this.fb.group({
				firstname: ['', Validators.required],
				lastname: ['', Validators.required],
			}),
			address: this.fb.group({
				city: ['', Validators.required],
				street: '',
				number: '',
				zipcode: '',
				geolocation: this.fb.group({
					lat: ['', Validators.required],
					long: ['', Validators.required],
				}),
			}),
			// address: this.fb.array([this.prepareAddressForm()]),
		});

		this.loadProfile();
	}

	prepareAddressForm() {
		console.log(` 🚀 👍 👏 ~File: profile.component.ts ~ at line 71:`, this.fb, `this.fb`);
		return this.fb.group({
			city: ['', Validators.required],
			street: '',
			number: '',
			zipcode: '',
			geolocation: this.fb.group({
				lat: ['', Validators.required],
				long: ['', Validators.required],
			}),
		});
	}

	removeAddress(index: number) {
		this.addresses.removeAt(index);
	}

	resetAddress() {
		this.addresses.clear();
	}

	addControl() {
		this.addresses.push(this.prepareAddressForm());
	}

	loadProfile() {
		this.userService.getUser().subscribe((user) => {
			this.profileForm.patchValue(user);
		});
	}

	updateProfile() {
		this.userService
			.updateUser(this.profileForm.getRawValue())
			.subscribe((user) => {
				console.log(user);
			});
	}

	toggleEdit() {
		this.profileForm.enabled
			? this.profileForm.disable()
			: this.profileForm.enable();
	}
}
