import { call, put, takeLatest } from 'redux-saga/effects';
import { envs } from '@/config';
import { TOrder } from '@/types/order';
import { getToken } from '@/utils';
import {
   createOrder,
   deleteOrder,
   fetchOrders,
   fetchOrdersFailure,
   fetchOrdersSuccess,
   updateOrder,
} from '../actions';

function* fetchOrdersSaga(): Generator<unknown> {
   const token = yield call(getToken);

   try {
      const response = yield call(
         async () =>
            await fetch(`http://${envs.NP_SERVER_URL}/orders`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }),
      );

      if ((response as Response).ok) {
         const orders = yield (response as Response).json();

         yield put(fetchOrdersSuccess(orders as TOrder[]));
      } else {
         yield put(fetchOrdersFailure('Failed to fetch orders'));
      }
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchOrdersFailure(error.message));
      } else {
         yield put(fetchOrdersFailure(`${error}`));
      }
   }
}

function* createOrderSaga(action: ReturnType<typeof createOrder>): Generator<unknown> {
   const token = yield call(getToken);

   try {
      yield call(
         async () =>
            await fetch(`http://${envs.NP_SERVER_URL}/orders`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify({
                  ...action.payload,
                  products: action.payload.products.map(product => product.id),
               } as TOrder),
            }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchOrdersFailure(error.message));
      } else {
         yield put(fetchOrdersFailure(`${error}`));
      }
   }
}

function* updateOrderSaga(action: ReturnType<typeof updateOrder>): Generator<unknown> {
   const token = yield call(getToken);

   try {
      yield call(
         async () =>
            await fetch(`http://${envs.NP_SERVER_URL}/orders/${action.payload.id}`, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(action.payload),
            }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchOrdersFailure(error.message));
      } else {
         yield put(fetchOrdersFailure(`${error}`));
      }
   }
}

function* deleteOrderSaga(action: ReturnType<typeof deleteOrder>): Generator<unknown> {
   const token = yield call(getToken);

   try {
      yield call(
         async () =>
            await fetch(`http://${envs.NP_SERVER_URL}/orders/${action.payload}`, {
               method: 'DELETE',
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchOrdersFailure(error.message));
      } else {
         yield put(fetchOrdersFailure(`${error}`));
      }
   }
}

export function* watchOrdersChanges() {
   yield takeLatest(fetchOrders, fetchOrdersSaga);
   yield takeLatest(createOrder, createOrderSaga);
   yield takeLatest(updateOrder, updateOrderSaga);
   yield takeLatest(deleteOrder, deleteOrderSaga);
}
