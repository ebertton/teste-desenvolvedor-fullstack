import { useState, useEffect } from 'react';
import styles from './Purchase.module.scss';
import http2 from '../../http2';
import { IPurchase } from 'interfaces/IPurchase';

export default function Purchase() {
	const formatter = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
	const [purchase, setPurchase] = useState<IPurchase[]>([]);

	useEffect(() => {
		http2.get('puschase')
			.then(resposta => setPurchase(resposta.data.puschases))
			.catch(erro => console.log(erro));

	}, []);


	return (
		<section className={styles.purchases}>
			<h1 className={styles.purchases__title}>Meus pedidos</h1>
			{
				purchase.map(
					(item, index) => (
						<div className={styles.purchases__purchase} key={index}>
							<ul>
								<li>Pedido: <strong>{item.id}</strong></li>
								<li>Data do pedido: <strong>{new Date(item.created_at).toLocaleDateString()}</strong></li>
								<li>Valor total: <strong>{formatter.format(Number(item.total_price))}</strong></li>
								
								<li><h1>Detalhes:</h1>
									<ul className={styles.purchases__purchase__item}>
										{
											item.order_items.map(
												(item, index) => (
													<li key={index}>
														<div>
															Produto: {item.name}
														</div>
														<div>
															Quantidade: {item.amount}
														</div>
														<div>
															Valor: {formatter.format(Number(item.price * item.amount))}
														</div>
														<hr />
													</li>
												)
											)
										}
									</ul>
								</li>
							</ul>
						</div >
					)
				)
			}
		</section >
	);
}