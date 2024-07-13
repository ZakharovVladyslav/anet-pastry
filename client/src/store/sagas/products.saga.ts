import { put, call, takeLatest } from 'redux-saga/effects';
import { TFullProductDTO } from '@/types/product';
import {
   FETCH_PRODUCTS,
   fetchProductsOnFailure,
   fetchProductsOnSuccess,
} from '../actions';

function* getProducts(): Generator<unknown> {
   try {
      const response = yield call(
         async () =>
            await fetch('http://localhost:3001/products').then(res => res.json()),
      );

      yield put(fetchProductsOnSuccess(response as TFullProductDTO[]));

      if ((response as Response)?.ok) {
         const products = yield (response as Response).json();

         yield put(fetchProductsOnSuccess(products as TFullProductDTO[]));
      } else {
         yield fetchProductsOnFailure('Failed to fetch products');
      }
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchProductsOnFailure(error.message));
      } else {
         yield put(fetchProductsOnFailure('An unknown error occured.'));
      }
   }
}

export function* watchProducts() {
   yield takeLatest(FETCH_PRODUCTS, getProducts);
}
