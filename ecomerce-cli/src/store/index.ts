import { configureStore } from '@reduxjs/toolkit';
import categorysSlice from './reducers/categorys';
import productsSlice from './reducers/products';
import productSlice from './reducers/product';
import cart from './reducers/cart';
const store = configureStore({
	reducer: {
		categorys: categorysSlice,
		products: productsSlice,
		product: productSlice,
		cart: cart
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;