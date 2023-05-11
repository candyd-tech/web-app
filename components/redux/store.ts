import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";
import userIdReducer from "./reducers/user";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    userId: userIdReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store;
