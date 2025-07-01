import React, { useEffect, useRef, useState } from "react";
import "./Intro.css";
import UserInfo from "./UserInfo";
import QuizSetting from "./QuizSetting";
import Login from "./Login";
import UserName from "../Components/UserName";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  clearUserAns,
  setUserDetail,
  updateCorrectCount,
  updateCurrentQuestionNo,
  updateIsQuizStart,
} from "../Redux/QuizSlice";
import { useDispatch } from "react-redux";

const auth = getAuth();

function Intro() {
  const [hide, setHide] = useState({ action: false, button: "" });

  const quizIntroRef = useRef();
  const userInfoRef = useRef();
  const loginInfoRef = useRef();
  const qSettingRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDetails = {
          name: user.displayName,
          email: user.email,
        };
        dispatch(setUserDetail(userDetails));
        handleAnimate(quizIntroRef, qSettingRef);
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

    const hideAndShow = (fromRef, toRef) => {
      fromRef.current.classList.remove("show");
      fromRef.current.classList.add("hide");
      fromRef.current.addEventListener(
        "animationend",
        handleAnimationEnd(toRef),
        {
          once: true,
        }
      );
    };

    if (hide.button === "showLogin") {
      hideAndShow(userInfoRef, loginInfoRef);
    } else if (hide.button === "ShowQuizSetting") {
      hideAndShow(loginInfoRef, qSettingRef);
    } else if (hide.button === "showUserInfo") {
      hideAndShow(loginInfoRef, userInfoRef);
    }
  }, [hide]);

  const handleAnimate = (hideRef, showRef) => {
    hideRef.current.classList.add("hide");

    const onEnd = () => {
      showRef.current.classList.add("show");
      hideRef.current.removeEventListener("animationend", onEnd);
    };

    hideRef.current.addEventListener("animationend", onEnd);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("You have been signed out 👋");
        dispatch(updateIsQuizStart(false));
        dispatch(updateCurrentQuestionNo(0));
        dispatch(updateCorrectCount(0));
        dispatch(clearUserAns());

        qSettingRef.current.classList.remove("show");
        loginInfoRef.current.classList.add("show");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="intro-box">
      <div className="user-info-box">
        {auth.currentUser && (
          <>
            <UserName user={auth.currentUser} />
            <button type="button" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}
      </div>

      <div ref={quizIntroRef} className="quiz-intro">
        <div className="text-box">
          <p>🌟 Welcome!</p>
          <p>
            Whether you're exploring the rhythms of <b>music</b>, the mysteries
            of <b>space</b>, or the wonders of <b>science</b>, you've just
            stepped into a world where <b>entertainment</b> meets{" "}
            <b>innovation</b>. From the fields of <b>agriculture</b> to the
            frontiers of <b>technology</b>, from <b>spiritual</b> insight to the
            thrill of <b>sports</b>, from <b>programming logic</b> to
            breathtaking <b>travel</b> adventures — there's something here for
            every curious mind.
          </p>
          <p>Let's dive in and discover it all together!</p>
          <p>🌍🚀🎶💻⚽️🌱🧘‍♀️</p>
        </div>
        <div className="buttonBox">
          <button onClick={() => handleAnimate(quizIntroRef, userInfoRef)}>
            SIGNIN
          </button>
          <button onClick={() => handleAnimate(quizIntroRef, loginInfoRef)}>
            LOGIN
          </button>
        </div>
      </div>

      <div ref={userInfoRef} className="user-info">
        <UserInfo setHide={setHide} />
      </div>

      <div ref={loginInfoRef} className="login-info">
        <Login setHide={setHide} />
      </div>

      <div ref={qSettingRef} className="q-setting">
        <QuizSetting setHide={setHide} />
      </div>
    </div>
  );
}

export default Intro;
