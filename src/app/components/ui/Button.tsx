export const FormBtn = ({ className, btnName }) => {
  return (
    <button
      className={`w-1/2 cursor-pointer flex items-center rounded-xl  px-3 py-2 justify-center hover:bg-opacity-100 ${className}`}
      type="submit"
      name={btnName}
    >
      <span className="text-center text-sm font-bold  text-slate-800">
        {btnName}
      </span>
    </button>
  );
};
