import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
   FLUSH,
   PAUSE,
   PERSIST,
   persistReducer,
   persistStore,
   PURGE,
   REGISTER,
   REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { adminsReducer, productsReducer } from './reducers';
import { creationCardReducer } from './reducers/creation-card';
import { ordersReducer } from './reducers/orders.reducer';
import { rootSaga } from './sagas';

const reducer = combineReducers({
   admins: adminsReducer,
   products: productsReducer,
   orders: ordersReducer,
   creationCard: creationCardReducer,
});

const persistConfig = {
   key: 'root',
   storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(sagaMiddleware),
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor, persistedReducer };
