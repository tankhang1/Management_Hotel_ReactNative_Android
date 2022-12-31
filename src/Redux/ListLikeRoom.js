import {createSlice} from '@reduxjs/toolkit';
const ListLikeRoom = createSlice({
  name: 'ListLikeRoom',
  initialState: [],
  reducers: {
    addLike: (state, action) => {
      state.push(action.payload.id);
    },
    deleteLike: (state, action) => {
      const list = [...state];
      const index = state.indexOf(action.payload.id);
      if (index !== -1) list.splice(index, 1);
      return list;
    },
    setLike: (state, action) => {
      return [];
    },
  },
});

export const {addLike, deleteLike} = ListLikeRoom.actions;
export default ListLikeRoom.reducer;
