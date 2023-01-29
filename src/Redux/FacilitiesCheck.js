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
  },
});

export const {addCheck, deleteCheck} = FacilitiesCheck.actions;
export default FacilitiesCheck.reducer;
