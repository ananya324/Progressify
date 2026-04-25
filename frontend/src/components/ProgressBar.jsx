const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 h-3 rounded mt-3">
      <div
        className="bg-green-500 h-3 rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
