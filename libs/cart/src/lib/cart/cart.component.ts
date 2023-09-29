import { Component, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from "@ngrx/store";
import { selectCart } from "../store/cart.selector";
import { ProductListComponent } from "../product-list/product-list.component";
import { Product } from "@org/product";

@Component({
	selector: 'org-cart',
	standalone: true,
	imports: [AsyncPipe, JsonPipe, NgForOf, NgIf, ProductListComponent],
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
		// this.store.dispatch(cartActions.loadCart({cartId: 1}))
	}

	delete(product: Product) {
		console.log(product);
	}
}
