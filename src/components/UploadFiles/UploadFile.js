import React from "react";

const UploadFile = () => {
  return (
    <div class="flex justify-between items-center mb-4">
      <h3>Addresses with Amounts</h3>

      <div class="relative">
        <label
          for="fileInput"
          class="bg-transparent border-none cursor-pointer opacity-50"
        >
          Upload File
        </label>
        <input type="file" id="fileInput" class="hidden" />
      </div>
    </div>
  );
};

export default UploadFile;
