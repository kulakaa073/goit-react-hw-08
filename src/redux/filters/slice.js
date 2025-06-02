import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = {
  filter: '',
};

const slice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setFilter: {
      reducer: (state, action) => {
        state.filter = action.payload.filter;
      },
      prepare: filter => {
        return {
          payload: { filter },
        };
      },
    },
  },
});

export const { setFilter } = slice.actions;
export const filtersReducer = slice.reducer;
