import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./src/features/Slice";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
