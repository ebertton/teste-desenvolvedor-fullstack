import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliceState {
	id: number | null
	name: string,
	email: string,

}

const initialState: SliceState = {
	id: null,
	name: '',
	email: '',
	
};

const userSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<SliceState>) {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
		}
	}
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;