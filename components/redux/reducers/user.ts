import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import UserType from "@/interfaces/UserType";

const initialState: UserType = {
  id: "",
  photo_url: "",
  fullname: "",
  email: "",
  posts: [],
  username: "",
  bio: "",
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: initialState
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.value = {
        ...state.value,
        ...action.payload
      }
    }
  }
})

const userReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.user.value
export const selectUid = (state: RootState) => state.user.value.id
export const { setUser } = userSlice.actions;
export default userReducer;
