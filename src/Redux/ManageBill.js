import {createSlice} from '@reduxjs/toolkit';
const ManageBill = createSlice({
  name: 'ManageBill',
  initialState: [],
  reducers: {
    addBill: (state, action) => {
      const id = action.payload.id;

      state.push(id);
    },
  },
});

export const {addBill} = ManageBill.actions;
export default ManageBill.reducer;
