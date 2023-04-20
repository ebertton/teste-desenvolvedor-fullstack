import styles from './Footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<h5 className={styles.mainHeaderTitle}>
				<span className={styles.logo}>StoreComputers</span>
			</h5>
		</footer>
	);
}