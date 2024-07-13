import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { TFullProductDTO } from '@/types/product';
import { clearProducts, fetchProductsOnFailure, fetchProductsOnSuccess } from '../actions';

type TInitialState = {
   products: TFullProductDTO[];
   productsError: null | string;
};

const initialState: TInitialState = {
   products: [],
   productsError: null,
};

const productsReducer = createReducer<TInitialState>(initialState, builder => {
   builder
      .addCase(
         fetchProductsOnSuccess,
         (state, action: PayloadAction<TFullProductDTO[]>) => {
            state.products = action.payload;
         },
      )
      .addCase(fetchProductsOnFailure, (state, action: PayloadAction<string>) => {
         state.productsError = action.payload;
      })
      .addCase(clearProducts, state => {
         state.products = [];
         state.productsError = null;
      })
});

export { productsReducer };
