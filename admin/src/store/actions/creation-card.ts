import { UUID } from 'crypto';
import { createAction } from '@reduxjs/toolkit';

export const CREATE_CREATION_CARD = 'CREATE_CARD';
export const PUT_CREATION_CARD = 'PUT_CARD';
export const CLEAR_PUT_CREATION_CARD = 'CLEAR_PUT_CARD';
export const UPDATE_CREATION_CARD = 'UPDATE_CARD';
export const CLEAR_CREATION_CARD = 'CLEAR_CARD';

export const createCreationCard = createAction<UUID>(CREATE_CREATION_CARD);
export const putCreationCard = createAction<TUpdateProduct>(PUT_CREATION_CARD);
export const clearPutCreationCard = createAction<TProduct>(CLEAR_PUT_CREATION_CARD);
export const updateCreationCard = createAction<TUpdateProduct>(UPDATE_CREATION_CARD);
export const clearCreationCard = createAction(CLEAR_CREATION_CARD);
