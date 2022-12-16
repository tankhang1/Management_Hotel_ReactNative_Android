import {createSlice} from '@reduxjs/toolkit';
import {fetchData} from '../thunk/fetchData';
import {fetchEmployees} from '../thunk/fetchEmployee';

const datas = createSlice({
  name: 'datas',
  initialState: {
    data: {
      employees: [],
      customers: [],
      bills: [],
      rooms: [],
      currentEmployee: null,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.data.employees.push(action.payload);
      return state;
    },
    addCustomer: (state, action) => {
      state.data.customers.push(action.payload);
      return state;
    },
    addBill: (state, action) => {
      state.data.bills.push(action.payload);
      return state;
    },
    addRoom: (state, action) => {
      state.data.rooms.push(action.payload);
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
export const {addEmployee, addCustomer, addBill, addRoom} = datas.actions;
export const dataReducer = datas.reducer;
