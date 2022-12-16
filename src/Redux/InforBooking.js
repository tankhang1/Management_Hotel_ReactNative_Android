import {createSlice} from '@reduxjs/toolkit';
const InforBooking = createSlice({
  name: 'Infor',
  initialState: null,
  reducers: {
    addInfor: (state, action) => {
      const newInfor = {
        name: action.payload.name,
        phone: action.payload.phone,
        date_check_in: action.payload.date_check_in,
        date_check_out: action.payload.date_check_out,
        passport: action.payload.passport,
      };
      return newInfor;
    },
  },
});

export const {addInfor} = InforBooking.actions;
export default InforBooking.reducer;
