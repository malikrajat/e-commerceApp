import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'org-product-list',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
}
