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
      let flag = -1;
      for (let i = 0; i < state.length; i++) {
        if (state[i].x === action.payload.name) {
          flag = i;
          break;
        }
      }
      state.splice(flag, 1);
    },
    updateSkill: (state, action) => {
      state.map((item, index) => {
        if (item.x === action.payload.name) {
          item.y = action.payload.level;
        }
      });
    },
  },
});

export const {addSkill, deleteSkill, updateSkill} = English_Level.actions;
export default English_Level.reducer;
