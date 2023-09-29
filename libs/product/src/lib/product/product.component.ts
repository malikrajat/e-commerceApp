import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from "@ngrx/store";
import { selectProducts } from "../store/product.selector";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { productActions } from "../store/product.action";
import { Product } from "../store/product";
import { cartActions } from "@org/cart";

@Component({
	selector: 'org-product',
	standalone: true,
	imports: [AsyncPipe, JsonPipe, MatCardModule, MatButtonModule, NgForOf, NgIf],
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	@Input({required: true}) animation: any;
	// products$ = this.categoryName
	//   ? this.store.select(selectProductsByCategory(this.categoryName))
	//   : this.store.select(selectProducts);

	products$ = this.store.select(selectProducts);

	constructor(
		private readonly store: Store
	) {
	}

	@Input({required: true}) set categoryName(name: string) {
		if (name) {
			this.store.dispatch(productActions.loadProductByCategory({category: name}))
		} else {
			// this.store.dispatch(productActions.loadProduct())
		}
	}

	ngOnInit() {
		// this.store.dispatch(productActions.loadProduct())
		console.log('')
	}

	addToCart(product: Product) {
		this.store.dispatch(cartActions.addProductToCart({product}));
	}
}
