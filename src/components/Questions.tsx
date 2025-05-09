import { useState, type Dispatch, type SetStateAction } from "react";
import ProgressBar from "./ProgressBar";
import type { userAnswers } from "./Questionnaire";

type IQuestionType = "soloSelect" | "multiSelect" | "text";
interface IAnswers {
  id: string;
  text: string;
  next: number;
}
interface IData {
  question: string;
  answers: IAnswers[];
  questionType: IQuestionType;
  id: number;
}
interface IQestionProp {
  data: IData[];
  setActiveStep: Dispatch<SetStateAction<number>>;
  activeStep: number;
  setPageRoute: Dispatch<SetStateAction<number[]>>;
  pageRoute: number[];
  setUserAnswers: Dispatch<SetStateAction<userAnswers>>;
  userAnswers: userAnswers;
}

function Questions({
  data,
  setActiveStep,
  setPageRoute,
  pageRoute,
  activeStep,
  setUserAnswers,
  userAnswers,
}: IQestionProp) {
  const [idAnswer, setIdAnswer] = useState<string | string[]>("");
  const { answers, id, question, questionType } = data[activeStep - 1];
  const chossenAnswer = answers.find((item) => item.id === idAnswer);
  const renderInput = () => {
    switch (questionType) {
      case "text":
        return (
          <div className="w-full max-w-lg mx-auto my-10">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M3 6h18"
                  />
                </svg>
              </span>
              <input
                type="text"
                onChange={(e) => setIdAnswer(e.target.value)}
                placeholder="پاسخ خود را اینجا بنویسید..."
                className="
                block w-full pl-10 pr-4 py-3 
                border-2 border-gray-300 rounded-lg 
                bg-gray-50 text-gray-800 
                placeholder-gray-400 
                focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 
                transition-all duration-200
              "
              />
            </div>
          </div>
        );
      case "multiSelect":
        return (
          <div className="flex flex-col items-center justify-between w-full gap-5 my-10 ">
            {answers.map((item, i) => {
              const isSelected = item.id == idAnswer[i];
              return (
                <button
                  className={`hover:border-gray-700 border cursor-pointer h-10 rounded-sm w-1/4 flex-wrap transition-all duration-200
                  ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-400 hover:border-gray-800"
                  }`}
                  onClick={() => setIdAnswer([...idAnswer, item.id])}
                >
                  {item.text}
                </button>
              );
            })}
          </div>
        );
      case "soloSelect":
        return (
          <div className="flex flex-col items-center justify-between w-full gap-5 my-10 ">
            {answers.map((item) => {
              const isSelected = item.id === idAnswer;
              return (
                <button
                  className={`hover:border-gray-700 border cursor-pointer h-10 rounded-sm w-1/4 flex-wrap transition-all duration-200
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-400 hover:border-gray-800"
                }`}
                  onClick={() => setIdAnswer(item.id)}
                >
                  {item.text}
                </button>
              );
            })}
          </div>
        );
    }
  };
  return (
    <div className="flex flex-col justify-around items-center min-h-screen mx-3 py-10">
      <div className="bg-white rounded-xl w-full text-center py-28">
        {question}
      </div>
      {renderInput()}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <button
            className={`cursor-pointer px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 
              ${
                idAnswer
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={() => {
              setActiveStep(
                chossenAnswer ? chossenAnswer.next : activeStep + 1
              );
              setPageRoute([...pageRoute, id]);
              setIdAnswer("");
            }}
            disabled={!idAnswer}
          >
            بعدی
          </button>
          <button
            className="cursor-pointer px-6 py-2 rounded-lg bg-white text-gray-700 border border-gray-400 shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-200 font-semibold"
            onClick={() => {
              setActiveStep(pageRoute[pageRoute.length - 1]);
              pageRoute.pop();
            }}
          >
            قبلی
          </button>
        </div>
        <ProgressBar percent={(pageRoute.length / data.length) * 100} />
      </div>
    </div>
  );
}

export default Questions;
