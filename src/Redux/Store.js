import { configureStore } from "@reduxjs/toolkit";
import QuizSlice from "./QuizSlice";

const store = configureStore({
  reducer: {
    QuizBank: QuizSlice,
  },
});

export default store;
