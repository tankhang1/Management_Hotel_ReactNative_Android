import {createSlice} from '@reduxjs/toolkit';
const English_Level = createSlice({
  name: 'English_Level',
  initialState: [],
  reducers: {
    addSkill: (state, action) => {
      const newSkill = {x: action.payload.name, y: action.payload.level};
      state.push(newSkill);
    },
    deleteSkill: (state, action) => {
      let index = state.map(value => value.x).indexOf(action.payload);
      state.splice(index, 1);
    },
    updateSkill: (state, action) => {
      state.map((item, index) => {
        if (item.x === action.payload.name) {
          item.y = action.payload.level;
        }
      });
    },
    resetSkill: (state, action) => {
      return [];
    },
  },
});

export const {addSkill, deleteSkill, updateSkill, resetSkill} =
  English_Level.actions;
export default English_Level.reducer;
