"use client";

import { useDispatch } from "react-redux";
import { setFilter } from "@/lib/features/tagSlice";

export const StatusCards = () => {
  const dispatch = useDispatch();

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ type: "status", value: event.target.value }));
  };

  return (
    <div className="mt-4 ">
      <h6 className="uppercase font-medium text-slate-500">Status</h6>

      <div className="flex flex-wrap my-2 gap-2">
        <label className="cursor-pointer flex bg-gray-400 bg-opacity-30 items-center rounded-xl px-3 py-2 justify-between hover:bg-opacity-80 relative">
          <input
            type="radio"
            className="opacity-30 mr-2 checked:opacity-75 cursor-pointer"
            name="filters"
            value={"completed"}
            onChange={handleStatusChange}
          />

          <span className="ml-2 text-sm mr-auto text-slate-600">Completed</span>
        </label>
        <label className="cursor-pointer flex bg-gray-400 bg-opacity-30 items-center rounded-xl px-3 py-2 justify-between hover:bg-opacity-80 relative">
          <input
            type="radio"
            className="opacity-30 mr-2 checked:opacity-75 cursor-pointer"
            name="filters"
            value={"pending"}
            onChange={handleStatusChange}
          />

          <span className="ml-2 text-sm mr-auto text-slate-600">Pending</span>
        </label>
      </div>
    </div>
  );
};
{
  /* <div className="cursor-pointer flex bg-gray-300 bg-opacity-0 items-center rounded-xl px-3 py-2 justify-between hover:bg-opacity-100">
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
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          </span>
          <span className="ml-2 text-sm mr-auto text-slate-600">Completed</span>
        </div>
        <div className="cursor-pointer flex bg-gray-300 bg-opacity-0 items-center rounded-xl  px-3 py-2 justify-between hover:bg-opacity-100">
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
          <span className="ml-2 text-sm mr-auto text-slate-600">
            Incomplete
          </span>
        </div> */
}
