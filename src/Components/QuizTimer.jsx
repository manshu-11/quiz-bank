import React, { useEffect, useRef, useState } from "react";
import "./QuizTimer.css";
import { useDispatch, useSelector } from "react-redux";
import { updateIsQuizStart } from "../Redux/QuizSlice";
function QuizTimer({ qTime }) {
  const [start, setStart] = useState(true);
  const [totalSec] = useState(+qTime * 60);
  const [curSec, setCurSec] = useState(+qTime * 60);
  const cNo = useSelector((state) => state.QuizBank.currentQuestionNo);
  const isQuizStart = useSelector((state) => state.QuizBank.isQuizStart);
  const dispatch = useDispatch();
  const inter = useRef();
  function returnDeg(sec) {
    let per = (sec / totalSec) * 100;
    let deg = (per / 100) * 360;
    return Math.round(deg);
  }
  useEffect(() => {
    if (isQuizStart) {
      inter.current = setInterval(() => {
        setCurSec((preVal) => preVal - 1);
      }, 1000);
    }
  }, [isQuizStart]);
  useEffect(() => {
    if (!isQuizStart) {
      clearInterval(inter.current);
    }
  }, [isQuizStart]);

  useEffect(() => {
    if (curSec === 0) {
      alert("⏰ Time's up!");
      dispatch(updateIsQuizStart(false));
      clearInterval(inter.current);
    }
  }, [curSec]);

  const min = Math.floor(curSec / 60);
  const sec = curSec % 60;

  return (
    <>
      <div
        className="time-box"
        style={{
          background: `conic-gradient(#58d58d ${returnDeg(
            curSec
          )}deg, #D4D4D4 0deg)`,
        }}
      >
        <h2 style={{ color: "#000", zIndex: 1 }}>
          {curSec !== 0
            ? `${min.toString().padStart(2, "0")}:${sec
                .toString()
                .padStart(2, "0")}`
            : "00:00"}
        </h2>
      </div>
    </>
  );
}
export default QuizTimer;
