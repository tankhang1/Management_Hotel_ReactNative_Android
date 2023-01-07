import {createSlice} from '@reduxjs/toolkit';
const DataRoom = createSlice({
  name: 'DataRoom',
  initialState: {},
  reducers: {
    addRoomList: (state, action) => {
      state.push(action.payload);
      return state;
    },
    setRoomList: (state, action) => {
      return action.payload;
    },
  },
});
export const {addRoomList, setRoomList} = DataRoom.actions;
export const dataRooms = DataRoom.reducer;
