import {createSlice} from '@reduxjs/toolkit';
const ManageId = createSlice({
  name: 'ManageId',
  initialState: null,
  reducers: {
    setId: (state, action) => {
      return action.payload.id;
    },
  },
});

export const {setId} = ManageId.actions;
export default ManageId.reducer;
