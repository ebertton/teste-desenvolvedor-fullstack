export interface IOrderItems {
	id: number,
	purchase_orders_id: number,
	products_id: number,
	name: string,
	description: string,
	provider: number,
	material: string,
	department: string,
	price: number,
	amount: number,
	created_at: string,
	updated_at:string
}
export interface IPurchase {
	id: number;
	created_at: string;
	total_items: string;
	total_price: string;
	order_items: IOrderItems[];
}