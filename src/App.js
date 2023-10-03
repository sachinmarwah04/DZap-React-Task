import { useState } from "react";
import {
  checkErrors,
  getErrorsArray,
  renderDuplicates,
  renderErrors,
  updateErrors,
} from "./helper";
import UploadFile from "./components/UploadFiles/UploadFile";
import InputBox from "./components/InputBox";
import SpecificationText from "./components/SpecificationText";
import DuplicatesBox from "./components/DuplicatesBox";
import ErrorToast from "./components/ErrorToast";
import NextButton from "./components/NextButton";

function App() {
  const [text, setText] = useState("");
  const [lines, setLines] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDuplicates, setIsDuplicates] = useState(false);

  const isErrors = checkErrors(errors);

  const updateDuplicate = () => {
    setIsDuplicates(true);
  };

  const syncScroll = () => {
    const indexColumn = document.getElementById("index-column");
    const textarea = document.getElementById("textarea");

    indexColumn.scrollTop = textarea.scrollTop;
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    let inputLines = inputText.split("\n");
    inputLines = inputLines.filter((item) => item.trim());
    setText(inputText);
    setLines(inputLines);
    setErrors({});
    setIsDuplicates(false);
    syncScroll();
  };

  const onSubmitClick = () => {
    if (!lines.length) {
      return;
    }
    const { temp_errors, isValuesDuplicated } = updateErrors(
      lines,
      updateDuplicate
    );
    setErrors(temp_errors);
    if (checkErrors(temp_errors) || isValuesDuplicated) {
      console.log("please fix errors");
      return;
    }
    alert(`Save Succesfully ${lines.join(",")}`);
  };

  const onKeepFirst = () => {
    const errorsArr = getErrorsArray(errors);
    const removalhash = {};

    errorsArr.forEach((item) => {
      if (item?.duplicates?.length > 1) {
        for (let i = 1; i < item?.duplicates?.length; i++) {
          const dupItem = item.duplicates[i];
          removalhash[dupItem] = true;
        }
      }
    });

    const finalLines = lines.filter((_, index) => !removalhash[index + 1]);
    const { temp_errors } = updateErrors(finalLines, updateDuplicate);
    setLines(finalLines);
    setText(finalLines.join("\n"));
    setIsDuplicates(false);
    setErrors(temp_errors);
  };

  const onCombine = () => {
    const errorsArr = getErrorsArray(errors);
    const finalLines = errorsArr.map((item) => {
      const { id, totalAmount, seperator } = item || {};
      const finalItem = `${id}${seperator}${totalAmount}`;
      return finalItem;
    });

    const { temp_errors } = updateErrors(finalLines, updateDuplicate);
    setLines(finalLines);
    setText(finalLines.join("\n"));
    setIsDuplicates(false);
    setErrors(temp_errors);
  };

  return (
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="p-6 text-base font-normal text-white bg-custom-grey max-w-3xl w-full">
        <UploadFile />

        <InputBox
          syncScroll={syncScroll}
          handleChange={handleChange}
          lines={lines}
          text={text}
        />

        <SpecificationText />

        <DuplicatesBox
          onCombine={onCombine}
          onKeepFirst={onKeepFirst}
          isDuplicates={isDuplicates}
          isErrors={isErrors}
        />

        {isErrors ? (
          <ErrorToast errors={errors} renderComp={renderErrors} />
        ) : null}

        {!isErrors && isDuplicates ? (
          <ErrorToast errors={errors} renderComp={renderDuplicates} />
        ) : null}

        <NextButton
          onSubmitClick={onSubmitClick}
          isErrors={isErrors}
          isDuplicates={isDuplicates}
        />
      </div>
    </div>
  );
}

export default App;
