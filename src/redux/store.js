import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { reducer } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({reducer});

const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: "",
    stateReconciler: hardSet
}

const pReducer = persistReducer(persistConfig, rootReducer);
// const pReducer = rootReducer;

export const store = createStore(
    pReducer,
    undefined,
    composeEnhancers(applyMiddleware())
);

export const persistor = persistStore(store);
