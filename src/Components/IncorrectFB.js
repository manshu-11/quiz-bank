import React from "react";
function IncorrectFB({ fData }) {
  return (
    <div className="wrongFeedback">
      {fData.wrongFbText.map((ele, i) => (
        <p key={i}>{ele.text}</p>
      ))}
    </div>
  );
}
export default IncorrectFB;
