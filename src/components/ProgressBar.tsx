type progressBarPropType = {
  percent: number;
};
function ProgressBar({ percent }: progressBarPropType) {
  return (
    <div
      style={{ direction: "ltr" }}
      className="relative  bg-gray-400  h-6 rounded-full w-3xs "
    >
      <div
        style={{ width: `${percent}%` }}
        className={`absolute bg-blue-600   h-full rounded-full text-xs font-medium flex justify-center items-center `}
      >
        {percent}%
      </div>
    </div>
  );
}

export default ProgressBar;
