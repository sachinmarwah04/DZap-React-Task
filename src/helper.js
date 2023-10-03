import { ADDRESS_LENGTH, ADDRESS_PREFIX } from "./constant";

export const checkErrors = (errorState) => {
  let isErrors = false;
  const errorsArr = getErrorsArray(errorState);
  errorsArr.forEach((item) => {
    const { invalidAddress, invalidAmount } = item || {};
    if (invalidAddress || invalidAmount) {
      isErrors = true;
    }
  });
  return isErrors;
};

export const getErrorsArray = (errorState) => {
  let result = [];
  for (let key in errorState) {
    const item = errorState[key];
    result.push({
      ...item,
      id: key,
      lineIndex: item?.duplicates?.[0],
    });
  }
  return result;
};

export const getAddressAndAmount = (ethereum) => {
  let temp_arr = [];
  let seperator = null;
  if (ethereum.includes(" ")) {
    temp_arr = ethereum.split(" ");
    seperator = " ";
  } else if (ethereum.includes(",")) {
    temp_arr = ethereum.split(",");
    seperator = ",";
  } else if (ethereum.includes("=")) {
    temp_arr = ethereum.split("=");
    seperator = "=";
  }
  temp_arr.push(seperator);
  return temp_arr;
};

export const updateErrors = (lineItems, updateDuplicate) => {
  let temp_errors = {};
  let isValuesDuplicated = false;

  lineItems.forEach((item, index) => {
    const [address, amount, seperator] = getAddressAndAmount(item);
    if (temp_errors[address]) {
      temp_errors[address]["duplicates"].push(index + 1);
      temp_errors[address]["totalAmount"] =
        temp_errors[address]["totalAmount"] + +amount;
      updateDuplicate();
      isValuesDuplicated = true;
    }

    if (!temp_errors[address]) {
      temp_errors[address] = {};
      temp_errors[address]["duplicates"] = [index + 1];
      temp_errors[address]["totalAmount"] = +amount;
      temp_errors[address]["seperator"] = seperator;
    }
    //CHECK FOR VALID ADDRESS

    if (!address.startsWith(ADDRESS_PREFIX)) {
      temp_errors[address] = {
        ...temp_errors[address],
        invalidAddress: true,
      };
    }

    if (address.length !== ADDRESS_LENGTH) {
      temp_errors[address] = {
        ...temp_errors[address],
        invalidAddress: true,
      };
    }

    if (isNaN(+amount)) {
      temp_errors[address] = {
        ...temp_errors[address],
        invalidAmount: true,
      };
    }
  });
  return { temp_errors, isValuesDuplicated };
};

export const renderErrorListItem = (errItem) => {
  const { lineIndex, id, invalidAddress, invalidAmount } = errItem || {};
  if (invalidAddress && invalidAmount) {
    return (
      <h3 className="ml-10 text-lg text-red-500" key={id}>
        line {`${lineIndex}`} Invalid etherium address and wrong amount
      </h3>
    );
  }
  if (invalidAddress) {
    return (
      <h3 className="ml-10 text-lg text-red-500" key={id}>
        line {`${lineIndex}`} Invalid etherium address
      </h3>
    );
  }
  if (invalidAmount) {
    return (
      <h3 className="ml-10 text-lg text-red-500" key={id}>
        line {`${lineIndex}`} Wrong amount
      </h3>
    );
  }
};

export const renderDuplicateListItem = (errItem) => {
  const { id, duplicates } = errItem || {};

  if (duplicates.length > 1) {
    return (
      <h3 className="ml-10 text-lg text-red-500" key={id}>
        {`${id} id duplicated in lines: ${duplicates.join(",")}`}
      </h3>
    );
  }
};

export const renderErrors = (errors) => {
  const errorsArr = getErrorsArray(errors);

  return errorsArr.map((errItem) => {
    return renderErrorListItem(errItem);
  });
};

export const renderDuplicates = (errors) => {
  const errorsArr = getErrorsArray(errors);

  return errorsArr.map((errItem) => {
    return renderDuplicateListItem(errItem);
  });
};
