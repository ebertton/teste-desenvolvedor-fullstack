import { useState } from 'react';
import styles from './Register.module.scss';
import http2 from '../../http2';

const strengthLabels = ['fraca', 'media', 'forte'];

export default function Register() {
	const [strength, setStrength] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmed, setPasswordConfirmed] = useState('');

	const getStrength = (password: string) => {
		console.log(password);

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


	const submittingForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		const user = {
			name,
			email,
			password,
			passwordConfirmed
		};

		http2.post('users/store', user)
			.then(() => {
				alert('Usuário foi cadastrado com sucesso!');
				setName('');
				setEmail('');
				setPassword('');
				setPasswordConfirmed('');
			})
			.catch(() => {
				alert('OPS! Alguma coisa deu errado!');
			});
	};

	return (
		<div className={styles.login}>
			<div className={styles.loginCard}>
				<h1 className={styles.mainHeaderTitle}>
					<span className='mainHeaderTitleBlue'>StoreComputers</span>
				</h1>
				<h2>Login</h2>
				<form className={styles.loginForm} onSubmit={submittingForm}>
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
					<div className={styles.name}>
						<input
							autoComplete='off'
							spellCheck='false'
							className={styles.control}
							type='text'
							placeholder='Nome'
							onChange={(event) => setName(event.target.value)}
							value={name}
						/>
						<div id='spinner' className={styles.spinner}></div>
					</div>
					<input
						name='password'
						spellCheck='false'
						className={styles.control}
						type='password'
						placeholder='senha'
						value={password}
						onChange={(event) => { setPassword(event.target.value); getStrength(event.target.value); }}
					/>
					<input
						name='passwordConfirmed'
						spellCheck='false'
						className={styles.control}
						type='password'
						value={passwordConfirmed}
						placeholder='Confirme a senha'
						onChange={(event) => { setPasswordConfirmed(event.target.value); getStrength(event.target.value); }}
					/>

					<div className={`bars ${styles.strength}`}>
						<div></div>
					</div>
					<div className={styles.strength}>{strength && <>Senha {strength} </>}</div>
					<button className={styles.control} type='submit'>
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
