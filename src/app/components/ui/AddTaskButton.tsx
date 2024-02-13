import React from "react";

type Props = {};

const AddTask = (props: Props) => {
  return (
    <div className="w-full my-2  cursor-pointer flex bg-gray-300 bg-opacity-0 items-center rounded-xl border-2 border-indigo-500/50 px-3 py-3 justify-start hover:bg-opacity-100">
      <span className="text-sm text-slate-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </span>
      <span className="ml-2 text-sm font-medium  text-slate-500">
        Add New Task
      </span>
    </div>
  );
};

export default AddTask;
