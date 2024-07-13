import { createReducer } from '@reduxjs/toolkit';
import {
   fetchProductsSuccess,
   fetchProductsFailure,
   createProduct,
   updateProduct,
   deleteProduct,
} from '../actions';

type TInitialState = {
   products: TProduct[];
   productsError: Nullable<string>;
};

const initialState: TInitialState = {
   products: [],
   productsError: null,
};

export const productsReducer = createReducer(initialState, builder => {
   builder
      .addCase(fetchProductsSuccess, (state, action) => {
         state.products = action.payload;
      })
      .addCase(fetchProductsFailure, (state, action) => {
         state.productsError = action.payload;
      })
      .addCase(createProduct, (state, action) => {
         state.products.push(action.payload);
      })
      .addCase(updateProduct, (state, action) => {
         const index = state.products.findIndex(
            product => product.id === action.payload.id,
         );
         state.products[index] = {
            ...state.products[index],
            ...action.payload,
         };
      })
      .addCase(deleteProduct, (state, action) => {
         state.products = state.products.filter(product => product.id !== action.payload);
      });
});
