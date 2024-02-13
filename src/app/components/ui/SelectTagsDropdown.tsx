"use client";

import { useDispatch, useSelector } from "react-redux";
import selectStyles from "./TaskForm.module.scss";
import { useEffect, useState } from "react";
import { useGetAllTagsQuery } from "@/lib/features/apiTask";
import { UseFormRegister } from "react-hook-form";
import {
  removeSelectedTag,
  removeListedTag,
  getTags,
} from "@/lib/features/tagSlice";
import { TRootState } from "../../../../types/global-interfaces";

interface SelectTagsDropdownProps {
  register: UseFormRegister<any>;
}

export const SelectTagsDropdown: React.FC<SelectTagsDropdownProps> = ({
  register,
}) => {
  const [isToggled, setToggled] = useState(false);

  const { data, isError, isSuccess, isLoading } = useGetAllTagsQuery();

  const dispatch = useDispatch();
  const tagsArr = data;
  useEffect(() => {
    dispatch(getTags(tagsArr));
  }, [dispatch, tagsArr]);

  const { listedTags, selectedTags } = useSelector(
    (state: TRootState) => state.tag
  );

  return (
    <div className="mt-4 ">
      <div>
        <h6 className="uppercase font-medium text-slate-600">Tags:</h6>
      </div>
      <div
        className={`${selectStyles.selectMultiple} 
          ${isToggled && listedTags?.length > 0 ? selectStyles.open : ""} `}
      >
        <div>
          <span
            className={`${selectedTags.length <= 0 ? "" : selectStyles.hide}`}
          >
            Add Tags
          </span>
          <div
            className={selectStyles.arrow}
            onClick={() => setToggled(!isToggled)}
          ></div>
          {selectedTags?.map((item) => (
            <a key={item.id} className="notShown shown">
              <em>{item.tag}</em>
              <i onClick={() => dispatch(removeSelectedTag(item.id))}></i>
            </a>
          ))}
        </div>
        <select
          multiple
          data-placeholder="Add Tags"
          // {...register("tags")} // Assuming you have a 'tags' field in your form
        >
          {listedTags?.map((item, index) => (
            <option
              key={item.id}
              onClick={() => dispatch(removeListedTag(item.id))}
            >
              {item.tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

{
  /* <ul>
  <li>sketch</li>
  <li>sketch</li>
  <li>sketch</li>
</ul> */
}
{
  /* <div>
          <span className="hide">
            ADD Tools
            <select multiple data-placeholder="Add tools">
              <option>Sketch</option>
              <option selected>Framer X</option>
              <option>Photoshop</option>
              <option>Principle</option>
              <option>Invision</option>
            </select>
          </span>
          <div className="arrow"></div>
          <a className="notShown shown">
            <em>Photoshop</em>
            <i></i>
          </a>
        </div> */
}
{
  /* <div className="flex items-center justify-between">
        <h6 className="uppercase font-medium text-slate-600">Tags</h6>
        <div className="w-2/3 cursor-pointer flex bg-btnYellow bg-opacity-70 items-center rounded-xl py-2 m-1  px-3 justify-between hover:bg-opacity-100">
          <span className="text-sm text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
          <span className="ml-2 text-sm font-semibold mr-auto text-slate-600">
            ADD TAG
          </span>
        </div>
      </div>
      <div className="flex flex-wrap">
        {genders?.map((gender) => (
          <div
            className="cursor-pointer flex  bg-gray-300 items-center rounded-md m-1 py-2 px-3 font-semibold hover:bg-gray-400"
            key={gender.id}
          >
            <span className=" text-sm mr-auto text-slate-600">
              {gender.name}
            </span>
          </div>
        ))}
      </div> */
}
