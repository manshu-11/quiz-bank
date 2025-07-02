import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Intro from "./Pages/Intro";
import StartQuiz from "./Pages/StartQuiz";
function App() {
  const reduxData = useSelector((state) => state.QuizBank);
  return (
    <div className="quiz_bank">
      {!reduxData.isQuizStart ? <Intro /> : <StartQuiz reduxData={reduxData} />}
    </div>
  );
}
export default App;
