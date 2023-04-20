import { useState } from 'react';
import styles from './Login.module.scss';
import http2 from '../../http2';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { setUser } from 'store/reducers/userLogado';

const strengthLabels = ['fraca', 'media', 'forte'];
interface Props {
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
	setUserLogado: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Signup(props: Props) {
	const [strength, setStrength] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {setToken, setUserLogado} = props;

	const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		
		const usuario = {
			email,
			password,
		};
		http2.post('auth/login', usuario)
			.then(response => {
				sessionStorage.setItem('token', response.data.token.access_token);
				setEmail('');
				setPassword('');
				dispatch(setUser({
					id: response.data.user.id,
					name: response.data.user.name,
					email: response.data.user.email
				}));
				setToken(response.data.token.access_token);
				setUserLogado(true);
				navigate('/', {replace: true});
			})
			.catch(erro => {
				if (erro?.response?.data?.message) {
					alert(erro.response.data.message);
				} else {
					alert('Aconteceu um erro inesperado ao afetuar o seu login! Entre em contato com o suporte!');
				}

			});
	};
	const getStrength = (password: string) => {
		let strengthIndicator = -1;

		let upper = false,
			lower = false,
			numbers = false;

		for (let index = 0; index < password.length; index++) {
			const char = password.charCodeAt(index);
			if (!upper && char >= 65 && char <= 90) {
				upper = true;
				strengthIndicator++;
			}

			if (!numbers && char >= 48 && char <= 57) {
				numbers = true;
				strengthIndicator++;
			}

			if (!lower && char >= 97 && char <= 122) {
				lower = true;
				strengthIndicator++;
			}
		}

		setStrength(strengthLabels[strengthIndicator] ?? '');
	};

	return (
		<div className={styles.login}>
			<div className={styles.loginCard}>
				<h1 className={styles.mainHeaderTitle}>
					<span className='mainHeaderTitleBlue'>StoreComputers</span>
				</h1>
				<h2>Login</h2>
				<form className={styles.loginForm} onSubmit={aoSubmeterFormular}>
					<div className={styles.username}>
						<input
							autoComplete='off'
							spellCheck='false'
							className={styles.control}
							type='email'
							placeholder='Email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						<div id='spinner' className={styles.spinner}></div>
					</div>
					<input
						name='password'
						spellCheck='false'
						className={styles.control}
						value={password}
						type='password'
						placeholder='Senha'
						onChange={(event) => { setPassword(event.target.value); getStrength(event.target.value); }}
					/>

					<div className={`bars ${styles.strength}`}>
						<div></div>
					</div>
					<div className={styles.strength}>{strength && <>Senha {strength} </>}</div>
					<button className={styles.control} type='submit'>
						Realizar login
					</button>
					<button type='button' className={styles.control} onClick={() => navigate('/register')} >
						Criar conta
					</button>
				</form>
			</div>
		</div>
	);
}
