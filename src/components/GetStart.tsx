import type { Dispatch, SetStateAction } from "react";

interface GetStartProp {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setPageRoute: Dispatch<SetStateAction<number[]>>;
}
function GetStart({ setActiveStep, setPageRoute }: GetStartProp) {
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-8 min-h-screen  p-6">
        <img src="/questionnaire.png" alt="Logo" className="w-24 h-24 mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 text-center">
          به نظرسنجی ما خوش آمدید!
        </h1>

        <p className="max-w-md text-center text-gray-600">
          از شما دعوت می‌کنیم در یک نظرسنجی کوتاه شرکت کنید و نظرات ارزشمندتان
          را با ما به اشتراک بگذارید. این فرآیند کمتر از ۳ دقیقه طول می‌کشد و
          اطلاعات شما کاملاً محرمانه خواهد ماند.
        </p>

        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-500 font-medium">حدود ۳ دقیقه</span>
        </div>

        <button
          className="text-white bg-[#5959e7] hover:bg-[#7474ff] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-20 py-6 text-center me-2 mb-2"
          onClick={() => {
            setActiveStep(1);
            setPageRoute([0]);
          }}
        >
          شروع نظرسنجی
        </button>
      </div>
    </>
  );
}

export default GetStart;
