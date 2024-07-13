import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@/types/order';

import { fetchOrdersOnSuccess, fetchOrdersOnFailure, createOrder, clearOrders } from '../actions';

const initialState: {
   orders: TOrder[];
   ordersError: string | null;
} = {
   orders: [],
   ordersError: null,
};

const ordersReducer = createReducer(initialState, builder => {
   builder
      .addCase(fetchOrdersOnSuccess, (state, action: PayloadAction<TOrder[]>) => {
         state.orders = action.payload;
      })
      .addCase(fetchOrdersOnFailure, (state, action: PayloadAction<string>) => {
         state.ordersError = action.payload;
      })
      .addCase(createOrder, (state, action: PayloadAction<TOrder>) => {
         state.orders.push(action.payload);
      })
      .addCase(clearOrders, state => {
         state.orders = [];
         state.ordersError = null;
      })
});

export { ordersReducer };
