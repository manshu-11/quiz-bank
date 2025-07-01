import React from "react";
function IncorrectFB({ fData }) {
  return (
    <div className="wrongFeedback">
      {fData.wrongFbText.map((ele) => (
        <p>{ele.text}</p>
      ))}
    </div>
  );
}
export default IncorrectFB;
