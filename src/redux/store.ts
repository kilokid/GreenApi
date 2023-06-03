import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    login: loginReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
})