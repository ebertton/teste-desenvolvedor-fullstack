import React, { useState } from 'react';
import styles from './Ordination.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import type { RootState } from 'store/index';
interface Props {
    categoryFilter: string | null,
    setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>,
}


export default function Categorys({
	categoryFilter, 
	setCategoryFilter,
}: Props) {
	const [open, setOpen] = useState(false);
	const categorys = useSelector((state: RootState) => state.categorys.categorys);
	const categoryName = categoryFilter && categorys.find((option: string) => option === categoryFilter);

	function selectFilter(option: string){
		if(categoryFilter === option) return setCategoryFilter(null);
		return setCategoryFilter(option);
	}
	

	return (
		<button className={classNames({
			[styles.ordination]: true,
			[styles['ordination--active']]: categoryFilter !== '',
		})} onClick={() => setOpen(!open)  } onBlur={() => setOpen(false)}>
			<span>{categoryName || 'Filtrar Por' }</span>
			{open ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
			<div className={classNames({
				[styles.ordination__options]: true,
				[styles['ordination__options--active']]: open,

			})}>
				{categorys.map((option: string, index: number) => (
					<div className={styles.ordination__option} key={index} onClick={() => selectFilter(option) }>
						{option}
					</div>
				))}
			</div>
		</button>
	);
}