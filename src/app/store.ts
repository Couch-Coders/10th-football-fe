import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@src/redux/userSlice';
import matchSlice from '@src/redux/matchSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userSlice,
    match: matchSlice,
  },
});

// https://redux-toolkit.js.org/tutorials/typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
