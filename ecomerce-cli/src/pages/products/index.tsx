import { useState, useEffect } from 'react';
import Itens from 'components/itens';
import Filters from 'components/filters';
import Ordination from 'components/ordination';
import styles from './Products.module.scss';
import { useAppDispatch } from 'app/hooks';
import { IProduct } from 'interfaces/IProducts';
import http from '../../http';
import { IProductFornecedorEuropean } from 'interfaces/IProductFornecedorEuropean';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { setCategorys } from 'store/reducers/categorys';
interface Props {
	search: string;
}



export default function Products(props: Props) {
	const { search } = props;
	const [ordination, setOrdination] = useState('');
	const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
	const [provider, setProvider] = useState<number | null>(null);



	const categorysList = useSelector((state: RootState) => state.categorys);
	const dispatch = useAppDispatch();

	const [productsEuropean, setProductsEuropean] = useState<IProduct[]>([]);

	const [productsBrazilian, setProductsBrazilian] = useState<IProduct[]>([]);

	const [products, setProducts] = useState<IProduct[]>([]);

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
				setProductsBrazilian(response.data);
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
				});
				setProductsEuropean(api2);

				dispatch(setCategorys([...categorysList.categorys, ...categorys]));

			})
			.catch(erro => console.log(erro));

		
	}, []);



	useEffect(() => {
		setProducts([...productsBrazilian, ...productsEuropean]);
	}, [productsBrazilian, productsEuropean]);


	return (
		<>
			<div className={styles.mainFilter}>
				<Filters provider={provider} setProvider={setProvider} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}></Filters>
				<Ordination ordination={ordination} setOrdination={setOrdination} ></Ordination>
			</div>
			<Itens products={products} setProducts={setProducts} provider={provider} search={search} categoryFilter={categoryFilter} ordination={ordination} />
		</>

	);
}