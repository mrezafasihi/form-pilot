import { useEffect, useState } from "react";
import GetStart from "./GetStart";
import Questions from "./Questions";

export type userAnswers=Record<number,string>

function Questionnaire() {
  const [activeStep, setActiveStep] = useState(0);
  const [qData, setQData] = useState();
  const [pageRoute, setPageRoute] = useState([0]);
  const [userAnswers,setUserAnswers]=useState<userAnswers[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/questions");
      const jsonQuestionnaire = await response.json();
      setQData(jsonQuestionnaire);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#e4e6ea] min-h-screen">
      {activeStep === 0 ? (
        <GetStart setActiveStep={setActiveStep} setPageRoute={setPageRoute} />
      ) : (
        <Questions
          data={qData}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          setPageRoute={setPageRoute}
          pageRoute={pageRoute}
          setUserAnswers={setUserAnswers}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
}

export default Questionnaire;
