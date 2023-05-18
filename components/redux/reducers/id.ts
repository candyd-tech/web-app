import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const idSlice = createSlice({
  name: 'id',
  initialState: {
    value: ''
  },
  reducers: {
    setToken: ( state, action: PayloadAction<string> ) => {
      state.value = action.payload
    }
  }
})

const idReducer = idSlice.reducer;

export const { setToken } = idSlice.actions;
export const selectId = (state: RootState) => state.id.value
export default idReducer;
