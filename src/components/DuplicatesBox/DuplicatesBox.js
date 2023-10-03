import React from "react";

const DuplicatesBox = ({ isErrors, isDuplicates, onKeepFirst, onCombine }) => {
  return !isErrors && isDuplicates ? (
    <div className="flex items-center justify-between my-4">
      <div className="w-max">
        <h3>Duplicated</h3>
      </div>

      <div className="flex w-max">
        <button
          onClick={onKeepFirst}
          className="pr-6 text-base text-red-500 border-r-2 border-red-500"
        >
          Keep the first one
        </button>
        <button onClick={onCombine} className="pl-6 text-base text-red-500">
          Combine Balance
        </button>
      </div>
    </div>
  ) : null;
};

export default DuplicatesBox;
