import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from 'interfaces/IProducts';
import { RootState } from 'store';
import http from '../../http';
import { IProductFornecedorEuropean } from 'interfaces/IProductFornecedorEuropean';

interface SliceState {
	product: IProduct,
	isLoading: boolean
}

const initialState: SliceState = {
	product: {} as IProduct,
	isLoading: false,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setProduct(state, action: PayloadAction<IProduct>) {
			state.product = action.payload;
		}
	}
});

export const { setLoading, setProduct } = productSlice.actions;

export const fetchEndpoint = (id: number, providerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(setLoading(true));
			if (providerId === 1) {
				const response = await Promise.all([
					http.get<IProduct>(`brazilian_provider/${id}`),
				]);
				const product = {
					id: response[0].data.id,
					descricao: response[0].data.descricao,
					fornecedor: 1,
					nome: response[0].data.nome,
					categoria: response[0].data.categoria,
					material: response[0].data.material,
					departamento: '',
					preco: Number(response[0].data.preco),
					descricaoPreco: 'No pix',
					quantidadeEstoque: 10,
					imagem: response[0].data.imagem,
				} as IProduct;

				console.log(product);
				dispatch(setProduct(product));
			}
			if (providerId === 2) {
				const response = await Promise.all([
					http.get<IProductFornecedorEuropean>(`european_provider/${id}`),
				]);

				const product = {
					id: response[0].data.id,
					descricao: response[0].data.description,
					fornecedor: 2,
					nome: response[0].data.name,
					categoria: response[0].data.details.adjective,
					material: response[0].data.details.material,
					departamento: '',
					preco: Number(response[0].data.price),
					descricaoPreco: 'No pix',
					quantidadeEstoque: 10,
					imagem: response[0].data.gallery[0],
				} as IProduct;
				console.log(product);
				dispatch(setProduct(product));
			}
			
		} catch (error) {
			console.error(error);
		}
	};
};

export const selectProduct = (state: RootState) => state.products;
export default productSlice.reducer;