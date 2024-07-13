import { createAction } from '@reduxjs/toolkit';
import { TOrder } from '@/types/order';

const FETCH_ORDERS = 'FETCH_ORDERS';
const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
const CREATE_ORDER = 'CREATE_ORDER';
const CLEAR_ORDERS = 'CLEAR_ORDERS';

const fetchOrders = createAction(FETCH_ORDERS);
const fetchOrdersOnSuccess = createAction<TOrder[]>(FETCH_ORDERS_SUCCESS);
const fetchOrdersOnFailure = createAction<string>(FETCH_ORDERS_FAILURE);
const createOrder = createAction<TOrder>(CREATE_ORDER);
const clearOrders = createAction(CLEAR_ORDERS);

export {
   FETCH_ORDERS,
   FETCH_ORDERS_SUCCESS,
   FETCH_ORDERS_FAILURE,
   CREATE_ORDER,
   CLEAR_ORDERS,
   fetchOrders,
   fetchOrdersOnSuccess,
   fetchOrdersOnFailure,
   createOrder,
   clearOrders,
};
