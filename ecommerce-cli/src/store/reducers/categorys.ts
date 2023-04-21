import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

const categorysSlice = createSlice({
	name: 'categorys',
	initialState: {
		categorys: [] as string[],
	},
	reducers: {
		setCategorys: (state, action: PayloadAction<string[]>) => 
		{
			state.categorys = action.payload;
		}
	}

});
export const { setCategorys }  = categorysSlice.actions;
export default categorysSlice.reducer;