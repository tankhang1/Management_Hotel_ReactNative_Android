import {createSlice} from '@reduxjs/toolkit';
const Collect_ID_Employee = createSlice({
  name: 'Collect_ID_Employee',
  initialState: 'E000001',
  reducers: {
    addId: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const {addId} = Collect_ID_Employee.actions;
export default Collect_ID_Employee.reducer;
