import { createReducer } from '@reduxjs/toolkit';

export const firstReducer = createReducer(
  { currencySet: 'inr' },
  {
    firstcase: (state, action) => {
      state.currencySet = action.payload[0];
    },
  }
);
