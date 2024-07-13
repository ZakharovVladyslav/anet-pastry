import { UUID } from 'crypto';
import { createAction } from '@reduxjs/toolkit';

export const FETCH_ADMINS = 'FETCH_ADMIN';
export const FETCH_ADMINS_SUCCESS = 'FETCH_ADMINS_SUCCESS';
export const FETCH_ADMINS_ERROR = 'FETCH_ADMINS_ERROR';
export const FETCH_ADMIN = 'FETCH_ADMIN';
export const FETCH_ADMIN_SUCCESS = 'FETCH_ADMIN_SUCCESS';
export const FETCH_ADMIN_ERROR = 'FETCH_ADMIN_ERROR';
export const UPDATE_ADMIN = 'UPDATE_ADMIN';
export const DELETE_ADMIN = 'DELETE_ADMIN';
export const CREATE_ADMIN = 'CREATE_ADMIN';

export const fetchAdmins = createAction(FETCH_ADMINS);
export const fetchAdminsOnSuccess = createAction<TAdmin[]>(FETCH_ADMINS_SUCCESS);
export const fetchAdminsOnError = createAction<string>(FETCH_ADMINS_ERROR);
export const fetchAdmin = createAction(FETCH_ADMIN);
export const fetchAdminSuccess = createAction<TAdmin>(FETCH_ADMIN_SUCCESS);
export const fetchAdminError = createAction<string>(FETCH_ADMIN_ERROR);
export const createAdmin = createAction<TAdmin>(CREATE_ADMIN);
export const updateAdmin = createAction<TAdmin>(UPDATE_ADMIN);
export const deleteAdmin = createAction<UUID>(DELETE_ADMIN);
