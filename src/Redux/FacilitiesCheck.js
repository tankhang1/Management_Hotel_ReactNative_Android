import {createSlice} from '@reduxjs/toolkit';

const FacilitiesCheck = createSlice({
  name: 'FacilitiesCheck',
  initialState: [],
  reducers: {
    addCheck: (state, action) => {
      state.push(action.payload);
    },
    deleteCheck: (state, action) => {
      state = state.filter(value => value !== action.payload);
      return state;
    },
    resetCheck: (state, action) => {
      return [];
    },
  },
});

export const {addCheck, deleteCheck, resetCheck} = FacilitiesCheck.actions;
export default FacilitiesCheck.reducer;
