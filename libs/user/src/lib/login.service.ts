import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	isLoggedIn = false;

	constructor(
		private readonly http: HttpClient
	) {
	}

	login(username: string, password: string): Observable<{ token: string }> {
		return this.http.post<{ token: string }>(`https://fakestoreapi.com/auth/login`, {username, password})
	}
}
