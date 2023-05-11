import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    inc: state => {
      state.value += 1
    }
  }
})

const counterReducer = counterSlice.reducer;

export const { inc } = counterSlice.actions;
export default counterReducer;
