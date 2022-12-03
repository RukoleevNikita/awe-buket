import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);
     
      if (findItem) {
        findItem.count++;
        
      } else {
        state.items.push({
          ...action.payload, 
          count: 1
        });
      }
      
      state.totalPrice = state.items.reduce((sum, obj) => {
        console.log('add', (Number(obj.price) * Number(obj.count)),  obj.price,  Number(obj.count));
        return (Number(obj.price) * Number(obj.count)) + sum;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;
        state.totalPrice = state.items.reduce((sum, obj) => {
          console.log('minus', (Number(obj.price) * Number(obj.count)),  obj.price, Number(obj.count));
          console.log('minus', (Number(obj.price) * Number(obj.count)) - obj.price);
          return (Number(obj.price) * Number(obj.count)) - obj.price;
        }, 0);
      }

    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return (Number(obj.price) * Number(obj.count)) - sum;
      }, 0);
    }
  }
}); 

export const cartReducer = cartSlice.reducer;
export const { addItem, minusItem, removeItem } = cartSlice.actions;