export interface Product {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
	quantity?: number;
}

export interface ProductState {
	products: Product[];
	productCount: number;
	error: string
}
