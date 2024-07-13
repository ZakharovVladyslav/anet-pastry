import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { put, call, takeLatest } from 'redux-saga/effects';
import { TUserDto } from '@/types/user';
import { getToken } from '@/utils';
import {
   createUser,
   fetchUser,
   fetchUserOnFailure,
   fetchUserOnSuccess,
   updateUser,
} from '../actions/user.action';

function* fetchUserSaga(): Generator<unknown> {
   const session = yield call(getSession);

   try {
      const token = yield call(async () => await getToken(session as Session));

      const response = yield call(
         async () =>
            await fetch('http://localhost:3001/users/user', {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }).then(res => res.json()),
      );

      if ((response as Response)?.ok) {
         const user = yield (response as Response).json();

         yield put(fetchUserOnSuccess(user as TUserDto));
      } else {
         yield fetchUserOnFailure('Failed to fetch users');
      }
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchUserOnFailure(error.message));
      } else {
         yield put(fetchUserOnFailure('An unknown error occured.'));
      }
   }
}

function* createUserSaga(action: ReturnType<typeof createUser>): Generator<unknown> {
   try {
      const user = action.payload;

      yield call(
         async () =>
            (await fetch('http://localhost:3001/users', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(user as TUserDto),
            }).then(res => res.json())) as TUserDto,
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchUserOnFailure(error.message));
      } else {
         yield put(fetchUserOnFailure('An unknown error occured.'));
      }
   }
}

function* updateUserSaga(action: ReturnType<typeof updateUser>): Generator<unknown> {
   const session = yield call(getSession);

   try {
      const user = action.payload;
      const token = yield call(async () => await getToken(session as Session));

      yield call(
         async () =>
            await fetch('http://localhost:3001/users/', {
               method: 'PATCH',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(user as TUserDto),
            }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchUserOnFailure(error.message));
      } else {
         yield put(fetchUserOnFailure('An unknown error occured.'));
      }
   }
}

export function* watchUsersSaga() {
   yield takeLatest(fetchUser, fetchUserSaga);
   yield takeLatest(createUser, createUserSaga);
   yield takeLatest(updateUser, updateUserSaga);
}
