import { call, put, takeLatest } from 'redux-saga/effects';
import { getToken } from '@/utils';
import {
   CREATE_ADMIN,
   DELETE_ADMIN,
   FETCH_ADMIN,
   FETCH_ADMINS,
   UPDATE_ADMIN,
   createAdmin,
   deleteAdmin,
   fetchAdminError,
   fetchAdminSuccess,
   fetchAdminsOnError,
   fetchAdminsOnSuccess,
   updateAdmin,
} from '../actions';
import { envs } from '@/config';

function* fetchAdminsSaga(): Generator<unknown> {
   const token = yield call(getToken);

   try {
      const response = yield call(() =>
         fetch(`http://${envs.NP_SERVER_URL}/admins`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      );

      if ((response as Response).ok) {
         const admins = yield (response as Response).json();

         yield put(fetchAdminsOnSuccess(admins as TAdmin[]));
      } else {
         yield put(fetchAdminsOnError('Failed to fetch admins'));
      }
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchAdminsOnError(error.message));
      } else {
         yield put(fetchAdminsOnError(`${error}`));
      }
   }
}

function* fetchAdminSaga(): Generator<unknown> {
   const token = yield call(getToken);

   try {
      const response = yield call(() =>
         fetch(`http://${envs.NP_SERVER_URL}/admins/admin`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      );

      if ((response as Response).ok) {
         const admin = yield (response as Response).json();

         yield put(fetchAdminSuccess(admin as TAdmin));
      } else {
         yield put(fetchAdminError('Failed to fetch admin'));
      }
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchAdminError(error.message));
      } else {
         yield put(fetchAdminError(`${error}`));
      }
   }
}

function* createAdminSaga(action: ReturnType<typeof createAdmin>): Generator<unknown> {
   const token = yield call(getToken);

   try {
      yield call(
         async () =>
            await fetch(`http://${envs.NP_SERVER_URL}/admins`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(action.payload),
            }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchAdminsOnError(error.message));
      } else {
         yield put(fetchAdminsOnError(`${error}`));
      }
   }
}

function* updateAdminSaga(action: ReturnType<typeof updateAdmin>): Generator<unknown> {
   const token = yield call(getToken);

   try {
      yield call(
         async () =>
            await fetch(`http://${envs.NP_SERVER_URL}/admins/${action.payload.id}`, {
               method: 'PATCH',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(action.payload),
            }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchAdminsOnError(error.message));
      } else {
         yield put(fetchAdminsOnError(`${error}`));
      }
   }
}

function* deleteAdminSaga(action: ReturnType<typeof deleteAdmin>): Generator<unknown> {
   const token = yield call(getToken);

   try {
      yield call(
         async () =>
            await fetch(`http://${envs.NP_SERVER_URL}/admins/${action.payload}`, {
               method: 'DELETE',
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchAdminsOnError(error.message));
      } else {
         yield put(fetchAdminsOnError(`${error}`));
      }
   }
}

export function* watchAdminsChanges() {
   yield takeLatest(FETCH_ADMINS, fetchAdminsSaga);
   yield takeLatest(FETCH_ADMIN, fetchAdminSaga);
   yield takeLatest(CREATE_ADMIN, createAdminSaga);
   yield takeLatest(UPDATE_ADMIN, updateAdminSaga);
   yield takeLatest(DELETE_ADMIN, deleteAdminSaga);
}
