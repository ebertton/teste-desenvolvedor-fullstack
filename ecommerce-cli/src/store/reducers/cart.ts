import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from 'interfaces/ICart';

const initialState = [] as ICart[];

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		updateCart: (state, action: PayloadAction<ICart>) => {
			const itemExists = state.some(item => item.product.id === action.payload.product.id);
			if (!itemExists) return [
				...state,
				{
					total: action.payload.total,
					product: {
						id: action.payload.product.id,
						descricao: action.payload.product.descricao,
						fornecedor: action.payload.product.fornecedor ,
						nome: action.payload.product.nome,
						categoria: action.payload.product.categoria,
						material: action.payload.product.material,
						departamento: action.payload.product.departamento,
						preco: action.payload.product.preco,
						descricaoPreco: 'No pix',
						quantidadeEstoque: 10,
						imagem: action.payload.product.imagem,
					}
				}
			];
			return state.filter(item => item.product.id !== action.payload.product.id);
		},
		setTotalCart: (state, action: PayloadAction<ICart>) => {
			
			state.map(item => {
				if (item.product.id ===  action.payload.product.id) {
					item.total  = action.payload.total;
				}
			});
			
		},
		clearCart: () => {
			return [];
		}
	}

});

export const { updateCart, setTotalCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;