import { Component, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from "@ngrx/store";
import { cartActions } from "../store/cart.action";
import { selectCart } from "../store/cart.selector";

@Component({
  selector: 'org-cart',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgForOf, NgIf],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart$ = this.store.select(selectCart);

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(cartActions.loadCart({cartId: 1}))
  }
}
