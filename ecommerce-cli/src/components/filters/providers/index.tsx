import React from 'react';
import  styles  from './Providers.module.scss';
import classNames from 'classnames';
import providers from './providers.json';

interface Props {
    provider: number | null;
    setProvider: React.Dispatch<React.SetStateAction<number | null>>
}


export default function Providers ({provider, setProvider}: Props) {

	function selectProvider(option: number){
		if(provider === option) return setProvider(null);
		return setProvider(option);
	}
	
	return <div className={styles.filters}>
		{providers.map((option, index) => (
			<button className={classNames({
				[styles.filters__filter] : true,
				[styles['filters__filter--active']] : provider === option.id
			})} key={index} onClick={() => selectProvider(option.id)}>
				{option.label}
			</button>

		))}
	</div>;
}
