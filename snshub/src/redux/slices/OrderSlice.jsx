import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        currentOrder: null,
    },
    reducers: {
        placeOrder: (state, action) => {
            state.currentOrder = action.payload;
        },
    },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
