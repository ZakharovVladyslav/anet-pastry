import { createReducer } from '@reduxjs/toolkit';
import { clearPutCreationCard, putCreationCard } from '../actions';

type TInitialState = {
   creationCard: TProduct;
};

const initialState: TInitialState = {
   creationCard: {} as TProduct,
};

export const creationCardReducer = createReducer(initialState, builder => {
   builder
      .addCase(putCreationCard, (state, action) => {
         state.creationCard = {
            ...state.creationCard,
            ...action.payload,
         } as TProduct;
      })
      .addCase(clearPutCreationCard, (state, action) => {
         state.creationCard = action.payload;
      });
});
