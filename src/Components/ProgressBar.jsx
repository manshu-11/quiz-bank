import React, { useMemo, useState } from "react";
import "./ProgressBar.css";

function ProgressBar({ qArr, cnt, per }) {
  const [arr] = useState(qArr);
  const qNoArr = useMemo(() => {
    let _temp = [];
    for (let i = 1; i <= arr; i++) {
      _temp.push(i);
    }
    return _temp;
  });
  function updateClass(i) {
    if (cnt === i) {
      return "active";
    } else if (cnt > i) {
      return "complete";
    }
    return "";
  }
  return (
    <>
      <div className="p-bar-box">
        <div className="bar">
          <div className="fill-bar" style={{ width: `${per}%` }}></div>
        </div>
        <div className="dots">
          {qNoArr.map((ele, i) => {
            return (
              <div key={i} className={`q-dot ${updateClass(i)}`}>
                {ele}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
