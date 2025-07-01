import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "../Redux/QuizSlice";
const auth = getAuth(app);
function Login({ setHide }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.QuizBank.userDetails);
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const userDetails = {
          name: userCredential._tokenResponse.displayName,
          email: userCredential._tokenResponse.email,
        };
        setUserData(userDetails);
        dispatch(setUserDetail(userDetails));
        setUserEmail("");
        setUserPassword("");
        setHide({ action: true, button: "ShowQuizSetting" });
        alert(`✅ Login successful! Welcome back 🎉`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorText = errorCode.split("/")[1].split("-").join(" ");
        setError(errorText.charAt(0).toUpperCase() + errorText.slice(1));
        alert(`❌ ${errorText}`);
      });
  };
  const handleEmailChange = (value) => {
    setUserEmail(value);
  };
  const handlePasswordChange = (value) => {
    setUserPassword(value);
  };
  const handleGotoSignIn = () => {
    setHide({ action: true, button: "showUserInfo" });
  };
  useEffect(() => {
    setUserData(user);
  }, [user]);
  return (
    <>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="option">
          <label className="info-label" htmlFor="email">
            Email ID:{" "}
          </label>
          <input
            className="input-box"
            type="email"
            name="email"
            value={userEmail}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
          />
        </div>
        <div className="option">
          <label className="info-label" htmlFor="fname">
            Password:{" "}
          </label>
          <input
            className="input-box"
            type="password"
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={userPassword}
            maxLength={100}
            name="fname"
            required
          />
        </div>
        <div className="button-box">
          <button type="submit">LOGIN</button>
          <span> - or go to - </span>
          <button type="button" onClick={handleGotoSignIn}>
            SIGNIN
          </button>
        </div>
      </form>
    </>
  );
}
export default Login;
