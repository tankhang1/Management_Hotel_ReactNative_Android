import {createSlice} from '@reduxjs/toolkit';
const Collect_ID_Customer_Profile = createSlice({
  name: 'Collect_ID_Customer_Profile',
  initialState: '1',
  reducers: {
    addId: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const {addId} = Collect_ID_Customer_Profile.actions;
export default Collect_ID_Customer_Profile.reducer;
