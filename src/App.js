import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Intro from "./Pages/Intro";
import StartQuiz from "./Pages/StartQuiz";
import { getAuth, signOut } from "firebase/auth";
import {
  clearUserAns,
  updateCorrectCount,
  updateCurrentQuestionNo,
  updateIsQuizStart,
} from "./Redux/QuizSlice";
import { useEffect } from "react";
const auth = getAuth();
function App() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.QuizBank);
  useEffect(() => {
    const handleUnload = () => {
      alert("aaa");
      signOut(auth)
        .then(() => {
          alert("You have been signed out 👋");
          dispatch(updateIsQuizStart(false));
          dispatch(updateCurrentQuestionNo(0));
          dispatch(updateCorrectCount(0));
          dispatch(clearUserAns());
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
  return (
    <div className="quiz_bank">
      {!reduxData.isQuizStart ? <Intro /> : <StartQuiz reduxData={reduxData} />}
    </div>
  );
}
export default App;
