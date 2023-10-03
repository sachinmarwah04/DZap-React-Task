import React from "react";

const ErrorToast = ({ renderComp, errors }) => {
  return (
    <div className="relative flex w-full h-full p-3 my-6 border-2 border-red-500 rounded-lg">
      <div className="absolute flex items-center justify-center border-2 border-red-500 rounded-full w-7 h-7">
        <span className="text-xl text-red-500">!</span>
      </div>
      <div>{renderComp(errors)}</div>
    </div>
  );
};

export default ErrorToast;
