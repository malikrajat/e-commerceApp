import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private readonly http: HttpClient
    ) {
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>('https://fakestoreapi.com/products/categories')
    }
}
