import { createSlice } from '@reduxjs/toolkit';
import { normalizePhoneNumber } from '../../utils';

const filtersInitialState = {
  name: '',
  number: '',
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
    setNumberFilter: {
      reducer: (state, action) => {
        state.number = action.payload.number;
      },
      prepare: number => {
        return {
          payload: { number: normalizePhoneNumber(number) },
        };
      },
    },
  },
});

export const { setNameFilter } = slice.actions;
export default slice.reducer;
