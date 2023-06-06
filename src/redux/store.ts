import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import loginReducer from './loginReducer';
import createChatReducer from './createChatReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    chat: createChatReducer,
    message: messageReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
})