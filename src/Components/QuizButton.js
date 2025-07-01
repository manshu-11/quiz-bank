import React from "react";
import "./QuizButton.css";
function QuizButton({ btnClass, btnName, clickEvent, disable }) {
  return (
    <button className={btnClass} onClick={clickEvent} disabled={disable}>
      {btnName}
    </button>
  );
}
export default QuizButton;
