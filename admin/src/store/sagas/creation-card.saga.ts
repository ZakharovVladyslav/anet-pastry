import { put, takeLatest } from 'redux-saga/effects';
import {
   CLEAR_CREATION_CARD,
   CREATE_CREATION_CARD,
   UPDATE_CREATION_CARD,
   clearPutCreationCard,
   createCreationCard,
   putCreationCard,
   updateCreationCard,
} from '../actions';

function* createCardSaga(
   action: ReturnType<typeof createCreationCard>,
): Generator<unknown> {
   const newCreationCard = {
      id: action.payload,
      name: '',
      description: '',
      dateCreated: '',
      category: '',
      isActive: false,
      price: 0,
      discount: 0,
      allergens: [],
      parameters: [],
      portionWeight: 0,
      imagesOrder: [],
      images: [],
   } as TUpdateProduct;

   yield put(clearPutCreationCard(newCreationCard as TProduct));
}

function* updateCardSaga(
   action: ReturnType<typeof updateCreationCard>,
): Generator<unknown> {
   yield put(putCreationCard(action.payload));
}

function* clearCardSaga(): Generator<unknown> {
   yield put(clearPutCreationCard({} as TProduct));
}

export function* watchCreationCardChanges() {
   yield takeLatest(CREATE_CREATION_CARD, createCardSaga);
   yield takeLatest(UPDATE_CREATION_CARD, updateCardSaga);
   yield takeLatest(CLEAR_CREATION_CARD, clearCardSaga);
}
