//import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Intro.css";
import UserInfo from "./UserInfo";
import QuizSetting from "./QuizSetting";
import { useEffect, useRef, useState } from "react";
import Login from "./Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  clearUserAns,
  setUserDetail,
  updateCorrectCount,
  updateCurrentQuestionNo,
  updateIsQuizStart,
} from "../Redux//QuizSlice";
import { useDispatch } from "react-redux";
import UserName from "../Components/UserName";

const auth = getAuth();

function Intro() {
  const [hide, setHide] = useState({ action: false, button: "" });
  const quizInto = useRef();
  const userInfo = useRef();
  const qSetting = useRef();
  const loginInfo = useRef();
  const dispatch = useDispatch();
  const user = auth.currentUser;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDetails = {
          name: user.displayName,
          email: user.email,
        };
        console.log(userDetails);
        dispatch(setUserDetail(userDetails));
        handleAnimate(quizInto, qSetting);
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (!hide.action) return;
    const handleAnimationEnd = (nextRef) => () => {
      nextRef.current.classList.add("show");
      setHide({ action: false, button: "" });
    };
    if (hide.button === "showLogin") {
      userInfo.current.classList.remove("show");
      userInfo.current.classList.add("hide");
      userInfo.current.addEventListener(
        "animationend",
        handleAnimationEnd(loginInfo),
        { once: true }
      );
    }
    if (hide.button === "ShowQuizSetting") {
      loginInfo.current.classList.remove("show");
      loginInfo.current.classList.add("hide");
      loginInfo.current.addEventListener(
        "animationend",
        handleAnimationEnd(qSetting),
        { once: true }
      );
    }
    if (hide.button === "showUserInfo") {
      loginInfo.current.classList.remove("show");
      loginInfo.current.classList.add("hide");
      loginInfo.current.addEventListener(
        "animationend",
        handleAnimationEnd(userInfo),
        { once: true }
      );
    }
    return () => {
      [quizInto, loginInfo, userInfo, qSetting].forEach((ref) => {
        ref.current?.removeEventListener("animationend", handleAnimationEnd);
      });
    };
  }, [hide.action, hide.button]);
  const handleAnimate = (hideObj, showObj) => {
    hideObj.current.classList.add("hide");
    quizInto.current.addEventListener("animationend", () => {
      showObj.current.classList.add("show");
      quizInto.current.removeEventListener("animationend", () => {
        showObj.current.classList.add("show");
      });
    });
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("You have been signed out 👋");
        dispatch(updateIsQuizStart(false));
        dispatch(updateCurrentQuestionNo(0));
        dispatch(updateCorrectCount(0));
        dispatch(clearUserAns());
        qSetting.current.classList.remove("show");
        loginInfo.current.classList.add("show");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="intro-box">
      <div className="user-info-box">
        {user && (
          <>
            <UserName user={user} />
            <button type="button" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}
      </div>
      <div ref={quizInto} className="quiz-intro">
        <div className="text-box">
          <p>🌟 Welcome! </p>
          <p>
            Whether you're exploring the rhythms of <b>music</b>, the mysteries
            of
            <b>space</b>, or the wonders of <b>science</b>, you've just stepped
            into a world where <b>entertainment</b> meets <b>innovation</b>.
            From the fields of <b>agriculture</b>
            to the frontiers of <b>technology</b>, from <b>spiritual</b> insight
            to the thrill of <b>sports</b>, from <b>programming logic</b> to
            breathtaking <b>travel</b> adventures — there's something here for
            every curious mind.
          </p>
          <p>Let's dive in and discover it all together!</p>
          <p>🌍🚀🎶💻⚽️🌱🧘‍♀️</p>
        </div>
        <div className="buttonBox">
          <button onClick={() => handleAnimate(quizInto, userInfo)}>
            SIGNIN
          </button>
          <button onClick={() => handleAnimate(quizInto, loginInfo)}>
            LOGIN
          </button>
        </div>
      </div>
      <div ref={userInfo} className="user-info">
        <UserInfo setHide={setHide} />
      </div>
      <div ref={loginInfo} className="login-info">
        <Login setHide={setHide} />
      </div>
      <div ref={qSetting} className="q-setting">
        <QuizSetting setHide={setHide} />
      </div>
    </div>
  );
}

export default Intro;
