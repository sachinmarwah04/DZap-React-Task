import React from "react";

const NextButton = ({ onSubmitClick, isErrors, isDuplicates }) => {
  return (
    <button
      onClick={onSubmitClick}
      className={`${
        isErrors || isDuplicates
          ? "w-full font-medium p-4 text-center bg-custom-grey-dark rounded-full disabled:pointer-events-none"
          : "w-full font-medium p-4 text-center bg-gradient-to-r from-purple-500 to-indigo-700 rounded-full cursor-pointer"
      }`}
    >
      Next
    </button>
  );
};

export default NextButton;
