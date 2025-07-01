import React, { useEffect, useState } from "react";
import McqMrq from "./McqMrq";
import { getRandomElement } from "../utils/utils";
import Result from "./Result";
//import { useSelector } from "react-redux";
const StartQuiz = ({ reduxData }) => {
  const [quizData, setQuizData] = useState();
  const [randomQU, setRandomQU] = useState();
  //const isQuizStart = useSelector((state) => state.QuizBank.isQuizStart);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/quiz-bank/Data/${reduxData?.quizSetting?.topic}.json`
        );
        const data = await res.json();
        setQuizData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const val = reduxData.quizSetting.randomQuestion === "true" ? true : false;
    if (quizData && val) {
      const quObj = getRandomElement(quizData?.quiz || []);
      setRandomQU(quObj);
    } else {
      setRandomQU(quizData?.quiz);
    }
  }, [quizData]);
  return (
    <>
      {randomQU &&
        (reduxData.currentQuestionNo < randomQU.length ? (
          <McqMrq
            quData={randomQU && randomQU[reduxData.currentQuestionNo]}
            reduxData={reduxData}
          />
        ) : (
          <Result />
        ))}
    </>
  );
};

export default StartQuiz;
