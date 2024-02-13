"use client";

import { clearFilter } from "@/lib/features/tagSlice";
import { useDispatch } from "react-redux";

export const AuthBtn = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center  mt-auto ">
      <div className=" cursor-pointer flex bg-gray-300 bg-opacity-0 items-center rounded-xl  px-3 py-2 justify-start hover:bg-opacity-100 pl-0">
        <span className="text-sm text-slate-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </span>
        <span className="ml-2 text-sm font-medium  text-slate-600">
          Sing Out
        </span>
      </div>
      <label className="cursor-pointer flex bg-gray-400 bg-opacity-30 items-center rounded-xl px-3 py-2 justify-between hover:bg-opacity-80 relative">
        <input
          type="radio"
          className="opacity-30 mr-2 checked:opacity-75 cursor-pointer absolute scale-0"
          name="filters"
          // value={"pending"}
          onChange={() => dispatch(clearFilter({ type: "search", value: "" }))}
        />

        <span className="ml-2 text-sm mr-auto text-slate-600">
          Clear Filter
        </span>
      </label>
    </div>
  );
};
