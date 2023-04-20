export interface IProductFornecedorEuropean {
	id: number,
	hasDiscount: false,
	name: string,
	gallery: string[],
	description: string,
	price: string,
	discountValue: string,
	details: {
		adjective: string ,
		material: string
	},
}