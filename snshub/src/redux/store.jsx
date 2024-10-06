import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import cartReducer from './slices/CartSlice';
import productReducer from './slices/ProductSlice';
import orderReducer from './slices/OrderSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productReducer,
        orders: orderReducer,
    },
});

export default store;
