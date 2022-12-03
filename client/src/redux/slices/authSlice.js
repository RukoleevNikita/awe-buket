import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/admin-panel/login', params); //изменить
  return data;
});

export  const fetchLogin =  createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/admin-panel/me');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state, action) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },

    [fetchLogin.pending]: (state, action) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchLogin.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  }
});

// export const selectIsAuth = state => Boolean(state.auth.data);
export const selectIsAuth = state => state.auth;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
