import { all, fork } from 'redux-saga/effects';

import { watchAdminsChanges } from './admins.saga';
import { watchCreationCardChanges } from './creation-card.saga';
import { watchOrdersChanges } from './orders.saga';
import { watchProductsChanges } from './products.saga';

export function* rootSaga() {
   yield all([
      fork(watchAdminsChanges),
      fork(watchProductsChanges),
      fork(watchOrdersChanges),
      fork(watchCreationCardChanges),
   ]);
}
