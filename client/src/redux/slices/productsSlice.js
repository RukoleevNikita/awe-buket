import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchProducts = createAsyncThunk('getallproducts/fetchProducts', async () => {
  const { data } = await axios.get('/getallproducts');

  return data;
});

export const fetchProductsAdmin = createAsyncThunk('getallproducts/fethProductsAdmin', async () => {
  const { data } = await axios.get('/admin-panel/getallproducts');

  return data;
});


export const createProduct = createAsyncThunk('add-product/fetchCreateProduct', async (createProductData) => {
  const { data } = await axios.post('/admin-panel/createproduct', createProductData);

  return data;
});

export const fetchUpdateProduct = createAsyncThunk('add-product/fetchUpdateProduct', async (updateProductData) => {
  const { data } = await axios.patch(`/admin-panel/updateproduct/${updateProductData.id}`, updateProductData);

  return data;
});

export const fetchRemoveProduct = createAsyncThunk('add-product/fetchRemoveProduct', async (id) => await axios.delete(`/admin-panel/removeproduct/${id}`));

const initialState = {
  products: {
    items: [],
    status: 'loading',
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducer: {},
  extraReducers: {
    // get products
    [fetchProducts.pending]: (state, action) => {
      state.products.items = [];
      state.products.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
    },
    [fetchProducts.rejected]: (state) => {
      state.products.items = [];
      state.products.status = 'error';
    },

    // get products Admin panel
    [fetchProductsAdmin.pending]: (state, action) => {
      state.products.items = [];
      state.products.status = 'loading';
    },
    [fetchProductsAdmin.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
    },
    [fetchProductsAdmin.rejected]: (state) => {
      state.products.items = [];
      state.products.status = 'error';
    },

    // create
    [createProduct.pending]: (state, action) => {
      state.products.items = [];
      state.products.status = 'loading';
    },
    [createProduct.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
    },
    [createProduct.rejected]: (state) => {
      state.products.items = [];
      state.products.status = 'error';
    },

    // update
    [fetchUpdateProduct.pending]: (state, action) => {
      state.products.items = [];
      state.products.status = 'loading';
    },
    [fetchUpdateProduct.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
    },
    [fetchUpdateProduct.rejected]: (state) => {
      state.products.items = [];
      state.products.status = 'error';
    },

    // delete
    [fetchRemoveProduct.pending]: (state, action) => {
      // console.log(state.products);
      state.products.items = state.products.items.filter(obj => obj._id !== action.meta.arg);
    },
    // [fetchRemoveProduct.fulfilled]: (state, action) => {
    //   state.products.items = action.payload;
    //   state.products.status = 'loaded';
    // },
    [fetchRemoveProduct.rejected]: (state) => {
      // state.products.items = [];
      state.products.status = 'error';
    },
  }
}); 

export const productsReducer = productsSlice.reducer;