import { createAction } from '@reduxjs/toolkit';
import { TUserDto } from '@/types/user';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_USER = 'CREATE_USER';

export const fetchUser = createAction(FETCH_USER);
export const fetchUserOnSuccess = createAction<TUserDto>(FETCH_USER_SUCCESS);
export const fetchUserOnFailure = createAction<string>(FETCH_USER_FAILURE);
export const createUser = createAction<TUserDto>(CREATE_USER);
export const updateUser = createAction<TUserDto>(UPDATE_USER);
