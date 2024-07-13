import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TOrder } from '@/types/order';
import { getToken } from '@/utils';
import {
   createOrder,
   FETCH_ORDERS,
   fetchOrders,
   fetchOrdersOnFailure,
   fetchOrdersOnSuccess,
} from '../actions';

function* fetchOrdersSaga(): Generator<unknown> {
   const session = yield call(getSession);

   try {
      const token = yield call(async () => await getToken(session as Session));

      const response = yield call(() =>
         fetch('http://localhost:3001/orders', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      );

      if ((response as Response)?.ok) {
         const orders = yield (response as Response).json();

         yield put(fetchOrdersOnSuccess(orders as TOrder[]));
      } else {
         yield fetchOrdersOnFailure('Failed to fetch orders');
      }
   } catch (error) {
      if (error instanceof Error) {
         yield fetchOrdersOnFailure(error.message);
      } else {
         yield fetchOrdersOnFailure(`${error}`);
      }
   }
}

function* createOrderSaga(action: ReturnType<typeof createOrder>): Generator<unknown> {
   const session = yield call(getSession);

   const token = yield call(async () => await getToken(session as Session));

   try {
      yield call(
         async () =>
            await fetch('http://localhost:3001/orders', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(action.payload),
            }),
      );

      yield put(fetchOrders());
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchOrdersOnFailure(error.message));
      } else {
         yield put(fetchOrdersOnFailure(`${error}`));
      }
   }
}

export function* watchOrdersSaga() {
   yield takeLatest(FETCH_ORDERS, fetchOrdersSaga);
   yield takeLatest(createOrder, createOrderSaga);
}
