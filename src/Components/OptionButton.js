import React from "react";
import "./OptionButton.css";
function OptionButton({ buttonRef, oText, type, optClick, correctAns }) {
  console.log("optionBtn");
  return (
    <button
      ref={buttonRef}
      data-select={"not-select"}
      data-id={false}
      className={`optionButton ${type}`}
      onClick={(e) => {
        optClick(e);
      }}
      style={{ color: correctAns ? "green" : "" }}
    >
      <div className="optBtn"></div>
      <div className="optText">
        <p>{oText}</p>
      </div>
    </button>
  );
}

export default OptionButton;
