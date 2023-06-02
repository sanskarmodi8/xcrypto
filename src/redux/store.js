import { configureStore } from '@reduxjs/toolkit';
import { firstReducer } from './reducer';

const store = configureStore({
  reducer: {
    first: firstReducer,
  },
});

export default store;
