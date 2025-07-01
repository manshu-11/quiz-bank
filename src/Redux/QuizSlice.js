import { createSlice } from "@reduxjs/toolkit";
const QuizSlice = createSlice({
  name: "QuizBank",
  initialState: {
    currentQuestionNo: 0,
    correctCount: 0,
    isQuizStart: false,
    quizSetting: null,
    userDetails: null,
    userAnswer: [],
  },
  reducers: {
    updateCurrentQuestionNo(state, action) {
      state.currentQuestionNo = action.payload;
    },
    updateCorrectCount(state, action) {
      state.correctCount = action.payload;
    },
    updateQuizSetting(state, action) {
      state.quizSetting = { ...action.payload };
    },
    updateIsQuizStart(state, action) {
      state.isQuizStart = action.payload;
    },
    setUserDetail(state, action) {
      state.userDetails = action.payload;
    },
    updateUserAns(state, action) {
      state.userAnswer = [...state.userAnswer, action.payload];
    },
    clearUserAns(state) {
      state.userAnswer = [];
    },
  },
});
export const {
  updateCurrentQuestionNo,
  updateCorrectCount,
  updateQuizSetting,
  updateIsQuizStart,
  setUserDetail,
  updateUserAns,
  clearUserAns,
} = QuizSlice.actions;
export default QuizSlice.reducer;
