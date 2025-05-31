import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = {
  name: '',
};

const slice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setNameFilter: {
      reducer: (state, action) => {
        state.name = action.payload.name;
      },
      prepare: name => {
        return {
          payload: { name },
        };
      },
    },
  },
});

export const { setNameFilter } = slice.actions;
export default slice.reducer;

// Selectors
export const selectNameFilter = state => state.filters.name;
