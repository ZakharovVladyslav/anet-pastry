import { createReducer } from '@reduxjs/toolkit';
import { TUserDto } from '@/types/user';
import {
   createUser,
   fetchUserOnFailure,
   fetchUserOnSuccess,
   updateUser,
} from '../actions/user.action';

type TInitialState = {
   user: TUserDto | null;
   userError: string | null;
};

const initialState: TInitialState = {
   user: null,
   userError: null,
};

export const usersReducer = createReducer(initialState, builder => {
   builder
      .addCase(fetchUserOnSuccess, (state, action) => {
         state.user = action.payload;
         state.userError = null;
      })
      .addCase(fetchUserOnFailure, (state, action) => {
         state.userError = action.payload;
      })
      .addCase(createUser, (state, action) => {
         state.user = action.payload as TUserDto;
      })
      .addCase(updateUser, (state, action) => {
         state.user = action.payload as TUserDto;
      });
});
