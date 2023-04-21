import styles from './Cart.module.scss';
import { useAppDispatch } from 'app/hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'interfaces/IProducts';
import { updateCart, setTotalCart, clearCart } from 'store/reducers/cart';
import http2 from '../../http2';
import { useNavigate } from 'react-router-dom';

export interface ICartItem {
	name: string
	description: string,
	products_id: number,
	provider: number | null,
	material: string,
	department: string,
	price: number | null,
	amount: number | null
}



export default function Cart() {
	const dispatch = useAppDispatch();
	const cart = useSelector((state: RootState) => state.cart);
	const navigate = useNavigate();
	let totalItens = 0;
	let priceTotal = 0;
	const formatter = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });

	cart.map(item => {
		totalItens += item.total;
		priceTotal += item.product.preco;
	});



	const submittingCart = () => {
		const arrayItems: ICartItem[] = [];
		cart.map(item => {
			arrayItems.push({
				name: item.product.nome,
				description: item.product.descricao,
				products_id: item.product.id,
				provider: item.product.fornecedor,
				material: item.product.material,
				department: item.product.departamento,
				price: item.product.preco,
				amount: item.total
			});

		});

		const item = {
			items: arrayItems
		};

		http2.post('puschase', item)
			.then(() => {
				alert('Pedido realizado!');
				navigate('/puschase');
				dispatch(clearCart());

			})
			.catch((error) => {
				if(error.response.status === 401){
					alert('Por favor, realize o login para continuar!');
					navigate('/login', {replace: true});
				}else{
					alert('OPS! Erro inesperado!');
				}
			});
	};



	function changeCart(product: IProduct, total: number) {
		dispatch(updateCart({
			product: product,
			total: total,
		}));
	}

	function changeCartTotal(product: IProduct, total: number) {
		dispatch(setTotalCart({
			product: product,
			total: total,
		}));
	}

	return (
		<section>
			<h2 className={styles.cartTitle}>Carrinho</h2>
			<div className=''>
				<ul>
					{cart.map((item, index) => (
						<li key={index} className={styles.cartItem}>
							<img className={styles.cartImg} src={item.product.imagem} />
							<p>{item.product.nome}</p>
							<p>Preço: {formatter.format(Number(item.product.preco))}</p>
							<label>
								Quantidade:
								<input className={styles.formInput} value={item.total} onChange={(event) => changeCartTotal(item.product, Number(event.target.value))} type="number" min={1} />
							</label>
							<button className={styles.removeButton} onClick={() => changeCart(item.product, item.total)}><FontAwesomeIcon icon={faTrash} size="lg" /></button>
						</li>
					))}


				</ul >
				<h2 className={styles.cartTotal}>Quantidade de itens: {totalItens}</h2>
				<h2 className={styles.cartTotal}>Valor total: {formatter.format(Number(priceTotal))}</h2>
				{totalItens > 0 ? <button className={styles.buyButton} onClick={ () => submittingCart()}> Finalizar compra</button > : ''}
			</div >
			{totalItens === 0 ? <p>Nenhum produto foi adicionado ao carrinho</p> : ''}
		
		</section >
	);
}