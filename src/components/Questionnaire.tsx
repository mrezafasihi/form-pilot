import { useEffect, useState } from "react";
import GetStart from "./GetStart";
import Questions from "./Questions";
import End from "./End";

export type userAnswers = Record<number, string>;

function Questionnaire() {
  const [activeStep, setActiveStep] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [stepHistory, setStepHistory] = useState([0]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/questions");
      const jsonQuestionnaire = await response.json();
      setQuestionData(jsonQuestionnaire);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(activeStep);
  return (
    <div className="bg-[#e4e6ea] min-h-screen">
      {activeStep === 0 ? (
        <GetStart setActiveStep={setActiveStep} setPageRoute={setStepHistory} />
      ) : activeStep === -1 ? (
        <End />
      ) : (
        <Questions
          data={questionData}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          setStepHistory={setStepHistory}
          stepHistory={stepHistory}
        />
      )}
    </div>
  );
}

export default Questionnaire;
