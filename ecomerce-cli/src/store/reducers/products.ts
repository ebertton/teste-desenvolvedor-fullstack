import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from 'interfaces/IProducts';
import { RootState } from 'store';
import http from '../../http';
import { IProductFornecedorEuropean } from 'interfaces/IProductFornecedorEuropean';


interface SliceState {
	endpoint1: IProduct[]
	endpoint2: IProduct[]
	categorys: string[]
}

const initialState: SliceState = {
	endpoint1: [] as IProduct[],
	endpoint2: [] as IProduct[],
	categorys: [] as string[]
};




const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setEndpoint1(state, action: PayloadAction<IProduct[]>) {

			state.endpoint1 = action.payload;

			const categorys = [] as string[];
			state.endpoint1.map(product => {
				if (categorys.indexOf(product.categoria) === -1) {
					categorys.push(product.categoria);
				}
			});

			state.endpoint1.map(option => {
				option.fornecedor = 1;
			});
			state.categorys = categorys;
		},
		setEndpoint2(state, action: PayloadAction<IProductFornecedorEuropean[]>) {
			action.payload.map(option => {
				state.endpoint2.push({
					id: option.id,
					descricao: option.description,
					fornecedor: 2,
					nome: option.name,
					categoria: option.details.adjective,
					material: option.details.material,
					departamento:  '',
					preco: Number(option.price),
					descricaoPreco: 'No pix',
					quantidadeEstoque: 10,
					imagem: option.gallery[0],
				});
			});
			const categorys = [] as string[];
			state.endpoint2.map(product => {
				if (categorys.indexOf(product.categoria) === -1) {
					categorys.push(product.categoria);
				}
			});
			state.categorys = [...state.categorys, ...categorys] ;
		},
		setError(state, action: PayloadAction<string>) {
			console.error(action.payload);
		},
	},
});

export const { setEndpoint1, setEndpoint2, setError } = productsSlice.actions;


export const fetchEndpoints = () => {
	
	return async (dispatch: Dispatch) => {
		try {
			const [response1, response2] = await Promise.all([
				http.get<IProduct[]>('brazilian_provider'),
				http.get<IProductFornecedorEuropean[]>('european_provider'),
			]);
			dispatch(setEndpoint1(response1.data));
			dispatch(setEndpoint2(response2.data));
			
		} catch (error) {
			console.error(error);
		}
	};
};


export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;