import React, { useState } from "react";
import {
  getDatabase,
  query,
  push,
  equalTo,
  ref,
  set,
  get,
  orderByChild,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase";
const db = getDatabase(app);
const auth = getAuth(app);
const usersRef = ref(db, "userData");
function UserInfo({ setHide }) {
  const [userData, setUserData] = useState({
    fname: "",
    gender: "",
    email: "",
    setPass: "",
    age: "",
    city: "",
  });
  const onInputChange = (e) => {
    setUserData((pre) => {
      return { ...pre, [e.target.name]: e.target.value.trim() };
    });
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(usersRef, orderByChild("email"), equalTo(userData.email));
      const snapshot = await get(q);
      if (snapshot.exists()) {
        alert("❌ Email already exists!");
        return false;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.setPass
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: userData.fname,
        });
      } catch (error) {
        console.error("Error creating user:", error.message);
      }
      const newRef = push(ref(db, "userData"));
      await set(newRef, userData);
      alert("✅ Data saved successfully!");
      setUserData({
        fname: "",
        gender: "",
        email: "",
        setPass: "",
        age: "",
        city: "",
      });
      setHide({ action: true, button: "showLogin" });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("❌ Failed to save data.");
    }
  };
  const handleGoLoginPage = () => {
    setHide({ action: true, button: "showLogin" });
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
            maxLength={100}
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
            Login Email ID:{" "}
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
          <label className="info-label" htmlFor="setPass">
            Set Password:{" "}
          </label>
          <input
            className="input-box"
            type="password"
            name="setPass"
            value={userData.setPass}
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
            min="10"
            max="100"
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
            maxLength="50"
            required
          />
        </div>
        <div className="button-box">
          <button type="submit">SIGNIN</button>
          <span> - or go - </span>
          <button onClick={handleGoLoginPage} type="button">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
