const InputBox = ({ lines, text, handleChange, syncScroll }) => {
  return (
    <div className="flex p-5 bg-black rounded-md h-72">
      <div
        id="index-column"
        className="flex flex-col items-end w-10 overflow-hidden bg-transparent border-r-2 opacity-2 border-r-white"
      >
        {lines.length === 0 && <h3 className="mr-1 text-white">1</h3>}
        {lines.map((_, index) => (
          <div key={index} className="mr-1 text-white">
            {index + 1}
          </div>
        ))}
      </div>
      <textarea
        id="textarea"
        className="flex-1 ml-1 overflow-y-auto font-mono text-base leading-6 text-white bg-transparent border-none outline-none resize-none"
        value={text}
        onChange={handleChange}
        onScroll={syncScroll}
      />
    </div>
  );
};

export default InputBox;
