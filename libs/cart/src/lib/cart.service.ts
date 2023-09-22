import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cart } from "./store/cart.action";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getCart(cartId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`https://fakestoreapi.com/carts/${cartId}`);
  }
}
