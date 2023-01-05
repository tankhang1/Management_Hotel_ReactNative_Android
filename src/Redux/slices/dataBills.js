import {createSlice} from '@reduxjs/toolkit';
const DataBill = createSlice({
  name: 'DataBill',
  initialState: [],
  reducers: {
    addBillList: (state, action) => {
      state.push(action.payload);
      return state;
    },
    setBillList: (state, action) => {
      return action.payload;
    },
  },
});
export const {addBillList, setBillList} = DataBill.actions;
export const dataBills = DataBill.reducer;
