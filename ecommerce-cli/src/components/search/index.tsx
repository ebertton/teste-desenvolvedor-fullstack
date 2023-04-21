import React from 'react';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
interface Props {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function Search({setSearch}: Props) {

	const navigate = useNavigate();

	function renderProducts(event:  string){
		navigate('/products');
		setSearch(event);
		
	}

	return (
    
		<form className={styles.searchForm}>
			<input type="text" placeholder='Buscar' name="descricao"  onChange={(event) => renderProducts(event.target.value)}/>
			<button type='button'><FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => navigate('/products')}/></button>
		</form>
       
	);
}