import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: null,
  isRefreshing: null,
});

export default slice.reducer;
