import { createAction } from '@reduxjs/toolkit';
import { TFullProductDTO } from '@/types/product';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';

const fetchProducts = createAction(FETCH_PRODUCTS);
const fetchProductsOnSuccess = createAction<TFullProductDTO[]>(FETCH_PRODUCTS_SUCCESS);
const fetchProductsOnFailure = createAction<string>(FETCH_PRODUCTS_FAILURE);
const clearProducts = createAction(CLEAR_PRODUCTS);

export {
   FETCH_PRODUCTS,
   FETCH_PRODUCTS_SUCCESS,
   FETCH_PRODUCTS_FAILURE,
   CLEAR_PRODUCTS,
   fetchProducts,
   fetchProductsOnSuccess,
   fetchProductsOnFailure,
   clearProducts,
}
