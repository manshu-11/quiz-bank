import React, { useCallback, useEffect, useRef, useState } from "react";
import "./McqMrq.css";
import QuestionHolder from "../Components/QuestionHolder";
import OptionButton from "../Components/OptionButton";
import CorrectFB from "../Components/CorrectFB";
import IncorrectFB from "../Components/IncorrectFB";
import QuizButton from "../Components/QuizButton";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCorrectCount,
  updateCurrentQuestionNo,
  updateUserAns,
} from "../Redux/QuizSlice";
import { getRandomElement } from "../utils/utils";
function McqMrq({ quData, reduxData }) {
  console.log("McqMrq");
  const refs = useRef([]);
  const [correctAns, setCorrectAns] = useState([]);
  const [isQuestionCorrect, setIsQuestionCorrect] = useState();
  const [isOptionSelected, setIsOptionSelected] = useState();
  const [quSubmit, setQuSubmit] = useState();
  const [randomOption, SetRandomOption] = useState();
  const nextQuestionNoDispatch = useDispatch();
  const correctDispatch = useDispatch();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.QuizBank.userDetails);
  const quizSetting = useSelector((state) => state.QuizBank.quizSetting);
  const [topic, setTopic] = useState();
  let cNo = reduxData.currentQuestionNo;
  let cCount = reduxData.correctCount;
  useEffect(() => {
    const val = reduxData.quizSetting.randomOption === "true" ? true : false;
    const randomOption = val ? getRandomElement(quData.option) : quData.option;
    refs.current = randomOption.map(
      (_, i) => refs.current[i] ?? React.createRef()
    );
    const optionAns = randomOption.map((ele, i) => ele.value);
    setCorrectAns(optionAns);
    SetRandomOption(randomOption);
  }, [quData.option]);
  const handleOptionButton = useCallback(
    (e) => {
      const currentOption = e.currentTarget;
      if (quData.type === "mcq") {
        quData.option.forEach((_, id) => {
          refs.current[id].current.classList.remove("selected");
          refs.current[id].current.setAttribute("data-select", "not-select");
          refs.current[id].current.setAttribute("data-id", false);
        });
        currentOption.classList.add("selected");
        currentOption.setAttribute("data-select", "select");
        currentOption.setAttribute("data-id", true);
      } else if (quData.type === "mrq") {
        currentOption.classList.toggle("selected");
        if (currentOption.classList.contains("selected")) {
          currentOption.setAttribute("data-select", "select");
          currentOption.setAttribute("data-id", true);
        } else {
          currentOption.setAttribute("data-select", "not-select");
          currentOption.setAttribute("data-id", false);
        }
      }
      showSubmitButton();
    },
    [quData.option, quData.type]
  );
  const handelSubmitAns = useCallback(
    (e) => {
      const userAns = refs.current.map((ele, i) =>
        JSON.parse(ele.current.getAttribute("data-id"))
      );
      const userAnsSelected = refs.current.map((ele, i) =>
        ele.current.getAttribute("data-Select")
      );
      console.log(userAnsSelected);
      const checkCorrect = correctAns.every((ele, i) => ele === userAns[i]);
      setIsQuestionCorrect(checkCorrect);
      setIsOptionSelected(false);
      setQuSubmit(true);
      const quizObj = {
        question: quData.questionText,
        option: randomOption,
        correctAns: correctAns,
        userAns: userAns,
        userSelectAns: userAnsSelected,
        checkCorrect: checkCorrect,
      };
      dispatch(updateUserAns(quizObj));
      quData.option.forEach((_, id) => {
        refs.current[id].current.disabled = true;
      });
    },
    [correctAns, quData.option]
  );
  const showSubmitButton = () => {
    const userAns = refs.current.map((ele, i) =>
      JSON.parse(ele.current.getAttribute("data-id"))
    );
    const isOptSelected = userAns.some((ele) => ele === true);
    setIsOptionSelected(isOptSelected);
  };
  const nextQuEvent = useCallback(
    (e) => {
      isQuestionCorrect && correctDispatch(updateCorrectCount(cCount + 1));
      nextQuestionNoDispatch(updateCurrentQuestionNo(cNo + 1));
      quData.option.forEach((_, id) => {
        refs.current[id].current.classList.remove("selected");
        refs.current[id].current.setAttribute("data-id", false);
        refs.current[id].current.disabled = false;
      });
      setIsQuestionCorrect();
      setIsOptionSelected();
      setQuSubmit();
    },
    [
      quData.option,
      cNo,
      nextQuestionNoDispatch,
      cCount,
      correctDispatch,
      isQuestionCorrect,
    ]
  );
  useEffect(() => {
    const topic =
      quizSetting.topic.toString().charAt(0).toUpperCase() +
      "" +
      quizSetting.topic.toString().slice(1);
    setTopic(topic);
  }, [quizSetting]);
  return (
    <>
      <div className="user-details-q">
        <div className="User-info-q">
          <p>
            <span>Name:</span> <span>{user && user?.name.trim()}</span>
          </p>
          <p>
            <span>Quiz Topic:</span>
            <span>{topic}</span>
          </p>
        </div>
      </div>
      <div className="questionHolder">
        <div className="qNo">{`Question : ${(cNo + 1)
          .toString()
          .padStart(2, "0")}`}</div>
        <div className="questionBox">
          <QuestionHolder
            qText={quData.questionText}
            insText={quData.instructionText}
          />
        </div>
        <div className="optionBox">
          {randomOption &&
            randomOption.map((ele, id) => {
              return (
                <OptionButton
                  key={`opt${id}`}
                  buttonRef={refs.current[id]}
                  oText={ele.text}
                  type={quData.type}
                  optClick={handleOptionButton}
                  correctAns={ele.value}
                />
              );
            })}
        </div>
        <div className="action-button">
          {isOptionSelected && (
            <QuizButton
              btnClass={"btn-submit"}
              btnName={"Submit"}
              clickEvent={handelSubmitAns}
              disable={false}
            />
          )}
        </div>
        <div className="feedback-holder">
          {isQuestionCorrect === true && <CorrectFB fData={quData} />}
          {isQuestionCorrect === false && <IncorrectFB fData={quData} />}
        </div>
        {quSubmit && (
          <QuizButton
            btnClass={"btn-next-question"}
            btnName={"Next Question"}
            clickEvent={nextQuEvent}
            disable={false}
          />
        )}
      </div>
    </>
  );
}
export default McqMrq;
