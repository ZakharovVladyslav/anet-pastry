import { createReducer } from '@reduxjs/toolkit';
import { TOrder } from '@/types/order';
import { createOrder, deleteOrder, fetchOrdersFailure, fetchOrdersSuccess, updateOrder } from '../actions';

type TInitialState = {
   orders: TOrder[];
   ordersError: Nullable<string>;
};

const initialState: TInitialState = {
   orders: [],
   ordersError: null,
};

export const ordersReducer = createReducer(initialState, builder => {
   builder
      .addCase(fetchOrdersSuccess, (state, action) => {
         state.orders = action.payload;
      })
      .addCase(fetchOrdersFailure, (state, action) => {
         state.ordersError = action.payload;
      })
      .addCase(createOrder, (state, action) => {
         state.orders.push(action.payload);
      })
      .addCase(updateOrder, (state, action) => {
         state.orders = state.orders.map(order =>
            order.id === action.payload.id ? action.payload : order,
         );
      })
      .addCase(deleteOrder, (state, action) => {
         state.orders = state.orders.filter(order => order.id !== action.payload);
      });
});
