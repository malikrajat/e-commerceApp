import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "./user.interface";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private readonly http: HttpClient
	) {
	}

	getUser() {
		return this.http.get<User>('https://fakestoreapi.com/users/2');
	}

	updateUser(user: User) {
		return this.http.put<User>(`https://fakestoreapi.com/users/${user.id}`, user);
	}
}
