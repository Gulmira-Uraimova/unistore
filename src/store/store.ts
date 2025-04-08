import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/slices/ProductSlice'
import cartReducer from '../features/slices/cartSlice'

export const store = configureStore({
	reducer: {
		products: productReducer,
		cart: cartReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
