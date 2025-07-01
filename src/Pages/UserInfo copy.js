import React, { useState } from "react";
function UserInfo({ setHide }) {
  const [userData, setUserData] = useState({
    fname: "",
    gender: "",
    email: "",
    age: "",
    city: "",
  });
  const onInputChange = (e) => {
    setUserData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryURL = `https://quiz-data-e8967-default-rtdb.firebaseio.com/userData.json?orderBy="email"&equalTo="${userData.email}"`;
      const checkRes = await fetch(queryURL);
      const checkData = await checkRes.json();
      console.log(checkData);
      /* if (checkData && Object.keys(checkData).length > 0) {
        alert("❌ Email already exists!");
        return;
      } */
      const res = await fetch(
        "https://quiz-data-e8967-default-rtdb.firebaseio.com/userData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (res.ok) {
        alert("✅ Data saved successfully!");
        setUserData({
          fname: "",
          gender: "",
          email: "",
          age: "",
          city: "",
        });
        setHide(true);
      } else {
        alert("❌ Failed to save data.");
      }
    } catch (error) {
      console.log("error:" + error);
    }
  };
  return (
    <div className="user-info-content">
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className="option">
          <label className="info-label" htmlFor="fname">
            Full Name:{" "}
          </label>
          <input
            className="input-box"
            type="text"
            onChange={(e) => onInputChange(e)}
            value={userData.fname}
            name="fname"
            required
          />
        </div>
        <div className="option">
          <label className="info-label" htmlFor="gender">
            Gender:{" "}
          </label>
          <input
            type="radio"
            name="gender"
            value="male"
            required
            onChange={(e) => onInputChange(e)}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => onInputChange(e)}
          />
          <label htmlFor="female">Female </label>
          <input
            type="radio"
            name="gender"
            value="other"
            onChange={(e) => onInputChange(e)}
          />
          <label htmlFor="other">Other </label>
        </div>
        <div className="option">
          <label className="info-label" htmlFor="email">
            Email ID:{" "}
          </label>
          <input
            className="input-box"
            type="email"
            name="email"
            value={userData.email}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="option">
          <label className="info-label" htmlFor="age">
            Age:{" "}
          </label>
          <input
            className="input-box"
            type="number"
            name="age"
            value={userData.age}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="option">
          <label className="info-label" htmlFor="city">
            City:{" "}
          </label>
          <input
            className="input-box"
            type="text"
            name="city"
            value={userData.city}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>

        <button type="submit">Save Info</button>
      </form>
    </div>
  );
}
