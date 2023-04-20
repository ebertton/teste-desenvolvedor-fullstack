import { IProduct } from 'interfaces/IProducts';
import styles from './Item.module.scss';
import { useNavigate } from 'react-router-dom';
export default function Item(props: IProduct) {
	const { nome, imagem, preco, descricaoPreco, categoria } = props;
	const navigate = useNavigate();
	const formatter = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
	function redirectProductDetail(productDetail: IProduct) {
		navigate(`/products/product/${productDetail.id}`, { state: { ...productDetail } });
	}

	return (
		<div className={styles.productList__card} onClick={() => redirectProductDetail(props)}  >
			<a className={styles.productList__link}>
				<img src={imagem} />
				<h2 className={styles.productItem__name}>
					{nome} - {categoria}
				</h2>
				<p className={styles.productItem__price}>
					{formatter.format(Number(preco))}

				</p>
				<p className={styles.productItem__priceDescription}>
					{descricaoPreco}
				</p>
				<button className={styles.productItem__buyButton}>Comprar</button>
			</a>
		</div>
	);
}