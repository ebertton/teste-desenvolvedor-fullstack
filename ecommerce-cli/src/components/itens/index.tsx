import { useEffect, useState } from 'react';
import styles from './Itens.module.scss';
import Item from './item';
import { IProduct } from 'interfaces/IProducts';


interface Props {
	search: string;
	provider: number | null;
	categoryFilter: string | null;
	ordination: string;
	products: IProduct[];
	setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function Itens(props: Props) {
	const { search, provider, ordination, categoryFilter, products } = props;
	const [list, setList] = useState(products);

	function performSearch(description: string) {
		const regex = new RegExp(search, 'i');
		return regex.test(description);
	}
	function performFilter(category: string) {
		if (categoryFilter !== null) return categoryFilter === category;
		return true;
	}

	function performProvider(providerId: number | null) {
		if (provider !== null) return provider === providerId;
		return true;
	}

	function orderList(newList: Array<IProduct>) {
		switch (ordination) {
		case 'preco':
			return newList.sort((itemA, itemB) => itemA.preco > itemB.preco ? 1 : -1);
		case 'ordem_alfabetica':
			return newList.sort((itemA, itemB) =>
				itemA.descricao.toUpperCase() === itemB.descricao.toUpperCase() ? 0 : itemA.descricao.toUpperCase() > itemB.descricao.toUpperCase() ? 1 : -1);
		default:
			return newList;
		}

	}

	useEffect(() => {

		const newList = products.filter(item => performSearch(item.nome) && performFilter(item.categoria) && performProvider(item.fornecedor));
		setList(orderList(newList));

	}, [search, categoryFilter, ordination, provider, products]);


	return (
		<section className={styles.productList}>
			{list.map((product, index) => (
				<Item
					key={index}
					{...product}
				/>
			))}
		</section >);
}