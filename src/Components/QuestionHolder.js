import React from "react";
import "./QuestionHolder.css";
function QuestionHolder({ qText, insText }) {
  return (
    <div className="question_holder">
      <div className="questionText">
        {qText.map((ele, id) => (
          <p key={`t_${id}`}>{ele.text}</p>
        ))}
      </div>
      <div className="questionInst">
        <p>
          <i>{insText}</i>
        </p>
      </div>
    </div>
  );
}

export default React.memo(QuestionHolder);
