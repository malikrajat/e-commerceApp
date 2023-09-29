import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { getCategoriesActions } from '@org/category';

@Component({
	standalone: true,
	imports: [
		NxWelcomeComponent,
		RouterModule,
		MainNavComponent,
		AsyncPipe,
		JsonPipe,
	],
	selector: 'org-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'santosh-workspace';

	// store$: Observable<string[]> = inject(Store);
	// categories$ = this.store.select(selectCategories)

	constructor(private readonly store: Store) {
	}

	ngOnInit() {
		this.store.dispatch(getCategoriesActions());
	}
}
