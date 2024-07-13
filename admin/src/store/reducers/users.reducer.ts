import { createReducer } from '@reduxjs/toolkit';
import { TUserDto } from '@/types/user';
import { fetchUsersFailure, fetchUsersSuccess } from '../actions';

type TInitialState = {
   users: TUserDto[];
   error: Nullable<string>;
};

const initialState: TInitialState = {
   users: [],
   error: null,
};

export const usersReducer = createReducer(initialState, builder => {
   builder
      .addCase(fetchUsersSuccess, (state, action) => {
         state.users = action.payload;
      })
      .addCase(fetchUsersFailure, (state, action) => {
         state.error = action.payload;
      });
});
