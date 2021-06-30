import { configureStore } from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import appReducer from './app-reducer';
import authReducer from './auth-reducer';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();