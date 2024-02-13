"use client";
import { useDispatch, useSelector } from "react-redux";
// import { setFilter } from "@/features/users/userSlice";
import { TRootState } from "../../../../types/global-interfaces";
import { setFilter } from "@/lib/features/tagSlice";
import { useState } from "react";

export const SearchBar = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const dispatch = useDispatch();
  const { filter } = useSelector((state: TRootState) => state.tag);
  const searchTerm = filter.type === "search" ? filter.value : "";

  const handleInputChange = () =>
    // event:
    //   | React.MouseEvent<SVGSVGElement, MouseEvent>
    //   | React.KeyboardEvent<HTMLInputElement>
    {
      // For setting a search term

      dispatch(setFilter({ type: "search", value: searchVal }));
    };

  return (
    <div className="space-y-4 my-3">
      <div className="flex gap-2 mx-2 relative items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute right-4 text-slate-400"
          onClick={() => handleInputChange()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="p-2 border rounded w-full focus:outline-none"
          placeholder="Search Tasks..."
          onKeyUp={(e) => {
            if (searchVal === "") {
              handleInputChange();
            }
            if (e.key === "Enter") {
              handleInputChange();
            }
          }}
        />
      </div>
    </div>
  );
};
