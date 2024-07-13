import { createAction } from '@reduxjs/toolkit';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const fetchProducts = createAction(FETCH_PRODUCTS);
export const fetchProductsSuccess =
   createAction<TProduct[]>(FETCH_PRODUCTS_SUCCESS);
export const fetchProductsFailure = createAction<string>(FETCH_PRODUCTS_FAILURE);
export const createProduct = createAction<TProduct>(CREATE_PRODUCT);
export const updateProduct = createAction<TProduct>(UPDATE_PRODUCT);
export const deleteProduct = createAction<string>(DELETE_PRODUCT);
