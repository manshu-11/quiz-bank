import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Result.css";
import {
  clearUserAns,
  updateCorrectCount,
  updateCurrentQuestionNo,
  updateIsQuizStart,
  updateUserAns,
} from "../Redux/QuizSlice";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

function Result() {
  const user = useSelector((state) => state.QuizBank.userDetails);
  const userAns = useSelector((state) => state.QuizBank.userAnswer);
  const quizSetting = useSelector((state) => state.QuizBank.quizSetting);
  const totalCorrect = useSelector((state) => state.QuizBank.correctCount);
  const totalQuestion = userAns && userAns.length;
  const dispatch = useDispatch();
  const [degree, setDegree] = useState();
  const [topic, setTopic] = useState();
  const handleAnotherQuiz = () => {
    dispatch(updateIsQuizStart(false));
    dispatch(updateCurrentQuestionNo(0));
    dispatch(updateCorrectCount(0));
    dispatch(clearUserAns());
  };
  const handleLogout = () => {
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
  useEffect(() => {
    const _totalPer = Math.round((totalCorrect / totalQuestion) * 100);
    const _degree = (_totalPer / 100) * 360;
    setDegree(_degree);
    const topic =
      quizSetting.topic.toString().charAt(0).toUpperCase() +
      "" +
      quizSetting.topic.toString().slice(1);
    setTopic(topic);
  }, [totalCorrect]);
  return (
    <div className="result-content">
      <div className="user-details">
        <div className="User-info">
          <p>
            <span>Name:</span> <span>{user && user?.name.trim()}</span>
          </p>
          <p>
            <span>Email:</span>
            <span>{user && user?.email}</span>
          </p>
          <p>
            <span>Quiz Topic:</span>
            <span>{topic}</span>
          </p>
        </div>
        <div className="Score">
          <div
            className="circle"
            style={{
              background: `conic-gradient(#58d58d ${degree}deg, #D4D4D4 0deg)`,
            }}
          >
            <div className="score-text">{`${totalCorrect}/${totalQuestion}`}</div>
          </div>
        </div>
      </div>
      <div className="result-table">
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th className="qBox">Question</th>
                <th className="">Correct Answer</th>
                <th className="">User Answer</th>
                <th className="pBox">Point</th>
              </tr>
            </thead>
            <tbody>
              {userAns &&
                userAns.map((qData, i) => {
                  return (
                    <tr key={`qu-${Date.now()}${i}`}>
                      <td className="qText">
                        {qData.question.map((q, i) => {
                          return <p key={`q${i}`}>{q.text}</p>;
                        })}
                      </td>
                      <td>
                        <ul>
                          {qData.option.map((o, i) => {
                            return (
                              <li
                                key={`o${i}`}
                                style={{
                                  color: o.value ? "green" : "inherit",
                                }}
                              >
                                {o.text}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {qData.option.map((o, i) => {
                            return (
                              <li
                                key={`o${i}`}
                                style={{
                                  color:
                                    qData.correctAns[i] === qData.userAns[i] &&
                                    qData.userSelectAns[i] === "select"
                                      ? "green"
                                      : qData.correctAns[i] === false &&
                                        qData.userSelectAns[i] === "select"
                                      ? "red"
                                      : "inherit",
                                }}
                              >
                                {o.text}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>
                        {qData.checkCorrect ? (
                          <div className="tc-box tick"></div>
                        ) : (
                          <div className="tc-box cross"></div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <button type="button" onClick={handleAnotherQuiz}>
        TRY ANOTHER TOPIC
      </button>{" "}
      <button type="button" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}

export default Result;
