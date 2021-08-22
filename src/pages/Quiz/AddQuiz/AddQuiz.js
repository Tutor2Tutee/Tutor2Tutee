import React, { useState } from "react";
import "./AddQuiz.css";
import InputField from "./../../../component/UI/InputField/InputField";

function AddQuiz() {
  const [title, setTitle] = useState("");
  const [noOfQuestion, setNoOfQuestion] = useState();
  const [showPopUpForm, setShowPopUpForm] = useState(true);
  const [questions, setQuestions] = useState([
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 1,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 2,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 3,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 4,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 5,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 6,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 7,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 8,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 9,
    },
    {
      prompt: "",
      answers: ["", "", "", ""],
      correct: "",
      questionno: 10,
    },
  ]);

  const IFToRender = questions.slice(0, parseInt(noOfQuestion));

  const onOptionChangeHandler = (event,questionNumber, optionNumber) => {
    const previousQuestion = [...questions]
    const questionNum = previousQuestion[questionNumber - 1]
    questionNum.answers[optionNumber - 1] = event.target.value
    previousQuestion[questionNumber - 1] =questionNum
    setQuestions(previousQuestion)
  }

  const onQuestionChangeHandler = (event, questionNumber) => {
    const previousQuestion = [...questions]
    const questionNum = previousQuestion[questionNumber - 1]
    questionNum.prompt = event.target.value
    previousQuestion[questionNumber - 1] =questionNum
    setQuestions(previousQuestion)
  }

  const onCorrectChangeHandler = (event, questionNumber) => {
    if(4 >= event.target.value >= 1){
      const previousQuestion = [...questions]
      const questionNum = previousQuestion[questionNumber - 1]
      questionNum.correct = event.target.value
      previousQuestion[questionNumber - 1] =questionNum
      setQuestions(previousQuestion)
    } else {
      alert("Please enter correct input")
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    let data = questions.slice(0, parseInt(noOfQuestion)).map(item => ({ ...item, correct : item.correct - 1}))
    console.log("Data ==> ",data)
  }

  // Add Transition Question Input Field

  return (
    <section className="add__quiz--section">
      {showPopUpForm && (
        <div className="add__quiz--container">
          <form className="add__quiz--form">
            <InputField
              type="text"
              placeholder="Title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
            <InputField
              type="number"
              placeholder="Number Of Questions e.g. 4 (Min-1) (Max-10)"
              onChange={(event) => setNoOfQuestion(event.target.value)}
              value={noOfQuestion}
            />
            <button
              type="button"
              onClick={() => {
                if (noOfQuestion >= 1 && noOfQuestion <= 10) {
                  setShowPopUpForm(false);
                } else {
                  alert("Please Enter Valid input!!");
                }
              }}
            >
              Add Questions
            </button>
          </form>
        </div>
      )}
      <form onSubmit={onSubmitHandler} className="add__quiz--form add__quiz__main--form ">
        <h1 className="add__quiz--head">{title}</h1>
        {noOfQuestion >= 1 &&
          noOfQuestion <= 10 &&
          IFToRender.map((num) => { 
            return (
              <div className="quiz__question--field">
                <InputField
                  type="text"
                  placeholder={`Question ${num.questionno}`}
                  onChange={event => onQuestionChangeHandler(event,parseInt(num.questionno))}
                  value={num.prompt}
                />
                <h1 className="ans__opt--head">Answer Options</h1>
                <InputField
                  type="text"
                  placeholder={`Option 1`}
                  onChange={event => onOptionChangeHandler(event,parseInt(num.questionno),1)}
                  value={num.answers[0]}
                />
                <InputField
                  type="text"
                  placeholder={`Option 2`}
                  onChange={event => onOptionChangeHandler(event,parseInt(num.questionno),2)}
                  value={num.answers[1]}
                />
                <InputField
                  type="text"
                  placeholder={`Option 3`}
                  onChange={event => onOptionChangeHandler(event,parseInt(num.questionno),3)}
                  value={num.answers[2]}
                />
                <InputField
                  type="text"
                  placeholder={`Option 4`}
                  onChange={event => onOptionChangeHandler(event,parseInt(num.questionno),4)}
                  value={num.answers[3]}
                />
                <h1 className="ans__opt--head">Correct Option</h1>
                <InputField
                  type="number"
                  placeholder={`Correct Option e.g. 1-4`}
                  onChange={event => onCorrectChangeHandler(event,parseInt(num.questionno))}
                  value={num.correct}
                />
              </div>
            );
          })}
        <button type="submit" onClick={() => setShowPopUpForm(false)}>
          Create Quiz
        </button>
      </form>
    </section>
  );
}

export default AddQuiz;
