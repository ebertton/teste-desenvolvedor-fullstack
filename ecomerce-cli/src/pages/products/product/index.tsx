import { useState, useEffect } from 'react';
import styles from './Product.module.scss';
import { useParams, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/index';
import { fetchEndpoint } from 'store/reducers/product';
import { updateCart } from 'store/reducers/cart';

export default function Product() {
	const { id } = useParams();
	const provider = useLocation().state.fornecedor;
	const dispatch = useAppDispatch();
	const product = useSelector((state: RootState) => state.product.product);
	const [amount, setAmount] = useState(1);
	const cart = useSelector((state: RootState) => state.cart);
	const inTheCart = cart.some(cartItem => cartItem.product.id === product.id);
	const formatter = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
	console.log(inTheCart);
	useEffect(() => {
		dispatch(fetchEndpoint(Number(id), provider));
	}, [dispatch]);

	function changeCart() {

		dispatch(updateCart({
			product: product,
			total: amount,

		}));
	}

	return (
		<section className={styles.product__container}>
			<div className={styles.productImage__container}>
				<img src={product?.imagem} alt={product?.descricao} />
			</div>
			<div className={styles.productDescription__container}>
				<h2 className={styles.product__name}>{product?.nome}</h2>
				<h3 className={styles.product__price}> {formatter.format(Number(product?.preco))}</h3>
				<p>Estoque disponível</p>
				<label>
					Quantidade:
					<input type="number" onChange={(event) => setAmount(Number(event.target.value))} value={amount} min="1" />
					unidade (s)
				</label>
				<p className={styles.product__avaiability}>
					{product?.quantidadeEstoque} unidade(s) em estoque
				</p>
				{inTheCart ? <button onClick={() => changeCart()} className={styles.buttonRemove}>Remover do carrinho</button> : <button onClick={() => changeCart()}>Adicionar ao carrinho</button>} 
			

			</div>
		</section >


	);
}