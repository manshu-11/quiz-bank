import React from "react";

function CorrectFB({ fData }) {
  return (
    <div className="correctFeedback">
      {fData.correctFbText.map((ele, i) => (
        <p key={i}>{ele.text}</p>
      ))}
    </div>
  );
}

export default CorrectFB;
