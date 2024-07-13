import { UUID } from 'crypto';
import { createAction } from '@reduxjs/toolkit';
import { TOrder } from '@/types/order';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const fetchOrders = createAction(FETCH_ORDERS);
export const fetchOrdersSuccess = createAction<TOrder[]>(FETCH_ORDERS_SUCCESS);
export const fetchOrdersFailure = createAction<string>(FETCH_ORDERS_FAILURE);
export const createOrder = createAction<TOrder>(CREATE_ORDER);
export const updateOrder = createAction<TOrder>(UPDATE_ORDER);
export const deleteOrder = createAction<UUID>(DELETE_ORDER);
