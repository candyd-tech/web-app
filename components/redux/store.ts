import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";
import userReducer from "./reducers/user";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store;
