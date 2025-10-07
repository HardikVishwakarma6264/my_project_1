const Confirmationmodel = ({ modaldata }) => {
  const { text1, text2, btn1text, btn2text, btn1handler, btn2handler } = modaldata;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[400px] max-w-[90%]">
        <h2 className="text-lg font-semibold mb-2">{text1}</h2>
        <p className="text-sm text-gray-600 mb-4">{text2}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={btn1handler}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            {btn1text}
          </button>
          <button
            onClick={btn2handler}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            {btn2text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmationmodel;
