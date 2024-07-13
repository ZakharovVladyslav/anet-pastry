import { all, fork } from 'redux-saga/effects';
import { watchOrdersSaga } from './orders.saga';
import { watchProducts } from './products.saga';
import { watchUsersSaga } from './user.saga';

function* rootSaga() {
   yield all([
      fork(watchProducts),
      fork(watchOrdersSaga),
      fork(watchUsersSaga)
   ]);
}

export { rootSaga };
