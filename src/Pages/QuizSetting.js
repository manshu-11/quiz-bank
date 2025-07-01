import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateIsQuizStart, updateQuizSetting } from "../Redux/QuizSlice";

function QuizSetting() {
  const dispatch = useDispatch();
  const [quizSetting, setQuizSetting] = useState({
    randomOption: "",
    randomQuestion: "",
    topic: "",
  });
  const onSettingChange = (e) => {
    setQuizSetting((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  const onStartQuiz = (e) => {
    e.preventDefault();
    if (quizSetting.topic !== "") {
      dispatch(updateQuizSetting(quizSetting));
      dispatch(updateIsQuizStart(true));
    } else {
      alert("🤔 Please select your favorite topic");
    }
  };
  return (
    <div className="quiz-setting-content">
      <div className="option">
        <label className="info-label" htmlFor="fname">
          Quiz Topic:
        </label>
        <select
          name="topic"
          id="topic"
          onChange={(e) => onSettingChange(e)}
          required
        >
          <option value="">Select</option>
          <option value="entertainment">Entertainment</option>
          <option value="technologies">Technologies</option>
          <option value="space">Space</option>
          <option value="sport">Sport</option>
          <option value="mechanical">Mechanical</option>
          <option value="agriculture">Agriculture</option>
          <option value="science">Science</option>
          <option value="music">Music</option>
          <option value="travel">Travel</option>
          <option value="spiritual">Spiritual</option>
        </select>
      </div>
      <div className="option">
        <label className="info-label" htmlFor="qRandom">
          Question Random:{" "}
        </label>
        <input
          type="radio"
          name="randomQuestion"
          value="true"
          required
          onChange={(e) => onSettingChange(e)}
        />
        <label htmlFor="true">True</label>
        <input
          type="radio"
          name="randomQuestion"
          value="false"
          onChange={(e) => onSettingChange(e)}
        />
        <label htmlFor="false">False </label>
      </div>
      <div className="option">
        <label className="info-label" htmlFor="qRandom">
          Option Random:{" "}
        </label>
        <input
          type="radio"
          name="randomOption"
          value="true"
          required
          onChange={(e) => onSettingChange(e)}
        />
        <label htmlFor="true">True</label>
        <input
          type="radio"
          name="randomOption"
          value="false"
          onChange={(e) => onSettingChange(e)}
        />
        <label htmlFor="false">False </label>
      </div>
      <button onClick={(e) => onStartQuiz(e)}>Start Quiz</button>
    </div>
  );
}

export default QuizSetting;
