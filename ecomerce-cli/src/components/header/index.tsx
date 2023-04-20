import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faFacebook, } from '@fortawesome/free-brands-svg-icons';
import Search from 'components/search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import http2 from '../../http2';

interface Props {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	userLogado: boolean;
	setUserLogado: React.Dispatch<React.SetStateAction<boolean>>
	token: string | null;
	setToken: React.Dispatch<React.SetStateAction<string | null>>
}


export default function Header(props: Props) {
	const { search, setSearch, userLogado, setUserLogado, token, setToken } = props;
	const cart = useSelector((state: RootState) => state.cart);
	let totalItens = 0;

	cart.map(item => {
		totalItens += item.total;
	});


	useEffect(() => {
		setUserLogado(token != null);
	}, [token, userLogado]);


	const routes = [
		{
			label: 'Início',
			to: '/',
			icon: null,
			badge: null
		},
		{
			label: 'Produtos',
			to: '/products',
			icon: null,
			badge: null
		},
		{
			label: 'Carrinho',
			to: '/cart',
			icon: faCartShopping,
			badge: 'badgeCarrinho',

		}
	];

	function logout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		event.preventDefault();
		http2.post('auth/logout')
			.then(() => {
				sessionStorage.removeItem('token');
				alert('Até logo...');
				setToken(null);
				setUserLogado(token != null);

			})
			.catch(() => {
				alert('OPS! Erro inesperado!');
			});
	}
	return (
		<div className='container_default'>
			<header className={styles.mainHeader}>
				<h1 className={styles.mainHeaderTitle}>
					<span className='mainHeaderTitleBlue'>Store</span><span className='mainHeaderTitleOrange'>Computers</span>
				</h1>
				<div className={styles.containerMenu}>
					<nav className={styles.mainHeaderMenu}>
						<ul>
							{routes.map((route, index) => (
								<li key={index}>

									<Link to={route.to}>
										{route.icon ? <FontAwesomeIcon icon={route.icon} /> : ''}
										{route.label}
										{route.badge ? <span className={styles[route.badge]}>{totalItens}</span> : ''}
									</Link>

								</li>
							))}
							<li>
								<a>
									<FontAwesomeIcon icon={faInstagram} />
								</a>
							</li>
							<li>
								<a>
									<FontAwesomeIcon icon={faFacebook} />
								</a>
							</li>
							<li>
								<a>
									<FontAwesomeIcon icon={faTwitter} />
								</a>
							</li>
							<li>
								{!userLogado && (
									<>
										<Link to='/login'>
											<FontAwesomeIcon icon={faLock} /> Login
										</Link>
									</>
								)}
								{userLogado && (
									<>
										<Link to='/puschase'>
											<FontAwesomeIcon icon={faCircleUser} size='lg' /> Perfil
										</Link>
										<a href='#' onClick={(event) => logout(event)}>
											<FontAwesomeIcon icon={faRightFromBracket} />
										</a>
									</>
								)}

							</li>


						</ul>
						<Search search={search} setSearch={setSearch} />

					</nav>
				</div>

			</header>
		</div>
	);
}