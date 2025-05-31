import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// {POST}
// /users/signup
// body: {  "name": 'string',
//          "email": 'string',
//          "password": 'string' }
export const userRegister = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('users/signup', credentials);
      console.log(response);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// {POST}
// users/login
// body: {  "email": "string",
//          "password": "string" }
export const userLogIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('users/login', credentials);
      console.log(response);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//{POST}
// /users/logout
// headers: Authorization: Beared token
export const userLogOut = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      const response = await axios.post('user/logout');
      console.log(response);
      clearAuthHeader();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
