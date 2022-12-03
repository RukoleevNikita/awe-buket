import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice'; 
import { productsReducer } from './slices/productsSlice'; 
import { cartReducer } from './slices/cartSlice'; 
// import { productReducer } from './slices/productSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer
    // product: productReducer | null,
  }
});