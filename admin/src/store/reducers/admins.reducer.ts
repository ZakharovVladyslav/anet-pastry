import { createReducer } from '@reduxjs/toolkit';
import {
   createAdmin,
   deleteAdmin,
   fetchAdminError,
   fetchAdminsOnError,
   fetchAdminsOnSuccess,
   fetchAdminSuccess,
   updateAdmin,
} from '../actions';

type TInitialState = {
   admins: TAdmin[];
   admin: TAdmin;
   adminError: Nullable<string>;
   adminsError: Nullable<string>;
};

const initialState: TInitialState = {
   admins: [],
   admin: {} as TAdmin,
   adminsError: null,
   adminError: null,
};

export const adminsReducer = createReducer(initialState, builder => {
   builder
      .addCase(fetchAdminsOnSuccess, (state, action) => {
         state.admins = action.payload;
         state.adminsError = null;
      })
      .addCase(fetchAdminsOnError, (state, action) => {
         state.adminsError = action.payload;
      })
      .addCase(fetchAdminSuccess, (state, action) => {
         state.admin = action.payload;
         state.adminError = null;
      })
      .addCase(fetchAdminError, (state, action) => {
         state.adminError = action.payload;
      })
      .addCase(createAdmin, (state, action) => {
         state.admins.push(action.payload);
         state.adminsError = null;
      })
      .addCase(updateAdmin, (state, action) => {
         const index = state.admins.findIndex(admin => admin.id === action.payload.id);

         if (index !== -1) {
            state.admins[index] = action.payload;
            state.adminError = null;
         }
      })
      .addCase(deleteAdmin, (state, action) => {
         state.admins = state.admins.filter(admin => admin.id !== action.payload);
      });
});
