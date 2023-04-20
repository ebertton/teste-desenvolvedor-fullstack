import { useEffect, useState } from 'react';
import styles from './Inicio.module.scss';
import http from '../../http';
import { useAppDispatch } from 'app/hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { IProduct } from 'interfaces/IProducts';
import { IProductFornecedorEuropean } from 'interfaces/IProductFornecedorEuropean';
import { setCategorys } from 'store/reducers/categorys';
import Item from 'components/itens/item';

export default function Home() {

	const [products, setProducts] = useState<IProduct[]>([]);
	const categorysList = useSelector((state: RootState) => state.categorys);
	const dispatch = useAppDispatch();
	useEffect(() => {
		http.get<IProduct[]>('brazilian_provider')
			.then(response => {
				const categorys = [] as string[];
				response.data.map(item => {
					item.fornecedor = 1;
					if (categorys.indexOf(item.categoria) === -1) {
						categorys.push(item.categoria);
					}
				});
				dispatch(setCategorys(categorys));
				setProducts(response.data);
			})
			.catch(erro => console.log(erro));
		http.get<IProductFornecedorEuropean[]>('european_provider')
			.then(response => {
				const api2: IProduct[] = [];
				const categorys = [] as string[];
				response.data.map(option => {
					api2.push({
						id: option.id,
						descricao: option.description,
						fornecedor: 2,
						nome: option.name,
						categoria: option.details.adjective,
						material: option.details.material,
						departamento: '',
						preco: Number(option.price),
						descricaoPreco: 'No pix',
						quantidadeEstoque: 10,
						imagem: option.gallery[0],
					});

					if (categorysList.categorys.indexOf(option.details.adjective) === -1) {
						categorys.push(option.details.adjective);
					}

					setProducts(products);
				});
				dispatch(setCategorys([...categorysList.categorys, ...categorys]));
			})
			.catch(erro => console.log(erro));
	}, []);
	let bestSellingProducts = [];

	bestSellingProducts = products.sort(() => 0.5 - Math.random()).splice(0, 4);

	return (
		<section>
			<h3 className={styles.title}>Mais vendidos</h3>
			<div className={styles.bestSellers}>
				{bestSellingProducts.map((item,index) => (
					<Item
						key={index}
						{...item}
					/>
				))}

			</div>
			<h3 className={styles.title}>Mais procurados</h3>
			<div className={styles.bestSellers}>
				{bestSellingProducts.map((item,index) => (
					<Item
						key={index}
						{...item}
					/>
				))}

			</div>
			<h3 className={styles.title}>Promoção</h3>
			<div className={styles.bestSellers}>
				{bestSellingProducts.map((item,index) => (
					<Item
						key={index}
						{...item}
					/>
				))}

			</div>
				
		</section>
	);
}