import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const userIdSlice = createSlice({
  name: 'uid',
  initialState: {
    value: ""
  },
  reducers: {
    setUid: (state, action) => {
      state.value = action.payload
    }
  }
})

const userIdReducer = userIdSlice.reducer;

export const selectUid = (state: RootState) => state.userId.value
export const { setUid } = userIdSlice.actions;
export default userIdReducer;

