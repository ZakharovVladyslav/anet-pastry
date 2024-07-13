import { createAction } from '@reduxjs/toolkit';
import { TUserDto } from '@/types/user';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsers = createAction(FETCH_USERS);
export const fetchUsersSuccess = createAction<TUserDto[]>(FETCH_USERS_SUCCESS);
export const fetchUsersFailure = createAction<string>(FETCH_USERS_FAILURE);
