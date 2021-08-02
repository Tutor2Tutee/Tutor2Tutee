import React from "react";
import { Link } from "react-router-dom";
import "./QuizList.css";

const QUIZ_LIST = [
  {
    title: "React Quiz",
    qid: "1",
    questionLength: 5,
  },
];

const QuizList = () => {
  return (
    <div>
      <section className="quizlist__main">
        <div className="quizlist__h1--container">
          <h1 className="quizlist__h1">Quiz</h1>
        </div>
        <div className="quizlist__container">
          {QUIZ_LIST.map((item) => (
            <div className="quizlist__quiz--card">
              <Link to={`/quiz/${item.qid}`}>
                <h1>{item.title}</h1>
                <p>No. Of Question : {item.questionLength}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default QuizList;
