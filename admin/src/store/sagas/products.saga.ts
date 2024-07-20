import { call, takeLatest, put } from 'redux-saga/effects';
import { getToken } from '@/utils';
import {
   createProduct,
   deleteProduct,
   fetchProducts,
   fetchProductsFailure,
   fetchProductsSuccess,
   updateProduct,
} from '../actions';
import { envs } from '@/config';

export function* fetchProductsSaga(): Generator<unknown> {
   try {
      const response = yield call(() => fetch(`http://${envs.NP_SERVER_URL}}/products`));

      if ((response as Response).ok) {
         const products = yield (response as Response).json();

         yield put(fetchProductsSuccess(products as TProduct[]));
      } else {
         yield put(fetchProductsFailure('Failed to fetch products'));
      }
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchProductsFailure(error.message));
      } else {
         yield put(fetchProductsFailure('An unknown error occurred.'));
      }
   }
}

export function* createProductSaga(
   action: ReturnType<typeof createProduct>,
): Generator<unknown> {
   try {
      const token = yield call(getToken);

      const formData = new FormData();

      const { images, ...payload } = action.payload;

      if (images && images.length > 0) {
         const imagePromises = images.map(async image => {
            const response = await fetch(image.image);
            const blob = await response.blob();

            return new File([blob], `${image.imageId}.png`, { type: 'image/png' });
         });

         const imageFiles = yield call(() => Promise.all(imagePromises));

         (imageFiles as File[]).forEach((file, index) => {
            formData.append(`image-${index}`, file);
         });
      }

      for (const [key, value] of Object.entries(payload)) {
         formData.append(
            key,
            typeof value === 'object' ? JSON.stringify(value) : value.toString(),
         );
      }

      yield call(() =>
         fetch(`http://${envs.NP_SERVER_URL}/products`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: formData,
         }),
      );

      yield call(fetchProductsSaga);
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchProductsFailure(error.message));
      } else {
         yield put(fetchProductsFailure('An unknown error occurred.'));
      }
   }
}

export function* updateProductSaga(
   action: ReturnType<typeof updateProduct>,
): Generator<unknown> {
   const token = yield call(getToken);

   try {
      const formData = new FormData();

      const { images, ...payload } = action.payload;

      const imagePromises = (images as TProductImage[]).map(async image => {
         /**
          * * If the image is a blob, it means it's a new image
          * * Only new images will be uploaded in order not to upload images which already
          * * exist on the server
          */

         if (!image.image.includes('blob')) return;

         const response = await fetch(image.image);
         const blob = await response.blob();

         return new File([blob], `${image.imageId}.png`, { type: 'image/png' });
      });

      const imageFiles = yield call(() => Promise.all(imagePromises));

      (imageFiles as File[]).filter(Boolean).forEach((file, index) => {
         formData.append(`image-${index}`, file);
      });

      for (const [key, value] of Object.entries(payload)) {
         formData.append(
            key,
            typeof value === 'object' ? JSON.stringify(value) : value.toString(),
         );
      }

      yield call(() =>
         fetch(`http://${envs.NP_SERVER_URL}/products/${action.payload.id}`, {
            method: 'PATCH',
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: formData,
         }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchProductsFailure(error.message));
      } else {
         yield put(fetchProductsFailure('An unknown error occurred.'));
      }
   }
}

export function* deleteProductSaga(
   action: ReturnType<typeof deleteProduct>,
): Generator<unknown> {
   const token = yield call(getToken);

   try {
      yield call(() =>
         fetch(`http://${envs.NP_SERVER_URL}/products/${action.payload}`, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      );
   } catch (error) {
      if (error instanceof Error) {
         yield put(fetchProductsFailure(error.message));
      } else {
         yield put(fetchProductsFailure('An unknown error occurred.'));
      }
   }
}

export function* watchProductsChanges() {
   yield takeLatest(fetchProducts, fetchProductsSaga);
   yield takeLatest(createProduct, createProductSaga);
   yield takeLatest(updateProduct, updateProductSaga);
   yield takeLatest(deleteProduct, deleteProductSaga);
}
