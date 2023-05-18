import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./reducers/id";
import userReducer from "./reducers/user";
import counterReducer from "./reducers/counter";

const store = configureStore({
  reducer: {
    id: idReducer,
    user: userReducer,
    counter: counterReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
