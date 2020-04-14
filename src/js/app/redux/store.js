/**
 *
 * Создание redux-store
 *
 *
 */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import authReducer from './auth-reducer';

// Редьюсеры
const reducers = combineReducers({
    // auth: authReducer,
});

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Создание Store
const store = createStore(reducers, composeEnchancers(applyMiddleware(thunk)));

export default store;