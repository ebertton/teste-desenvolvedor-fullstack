import React from 'react';
import Categorys from './categorys';
import Providers from './providers';
import styles from './Filters.module.scss';

interface Props {
	categoryFilter: string | null,
	setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>,
	provider: number | null;
    setProvider: React.Dispatch<React.SetStateAction<number | null>>
}

export default function Filters({ categoryFilter, setCategoryFilter, provider, setProvider }: Props) {


	return (
		<div className={styles.filters}>
			<Providers provider={provider}  setProvider={setProvider}/>
			<Categorys categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} ></Categorys>
		</div>
	);
}
