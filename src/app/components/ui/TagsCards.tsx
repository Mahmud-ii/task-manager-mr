"use client";

import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "./Modal";
import { useAddTagMutation, useGetAllTagsQuery } from "@/lib/features/apiTask";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setFilter } from "@/lib/features/tagSlice";

interface FormData {
  tag: string;
}

const schema = z.object({
  tag: z.string().min(1, { message: "Tag name is required" }),
});

export const TagsCards = () => {
  const dispatch = useDispatch();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const { data, isError, isSuccess, isLoading } = useGetAllTagsQuery();
  const [addTag] = useAddTagMutation();

  const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ type: "tags", value: event.target.value }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addTag(data);
    setOpenModalEdit(false);
  };

  return (
    <div className="mt-4 ">
      <h6 className="uppercase font-medium text-slate-600">Tags</h6>
      <div className="flex flex-wrap">
        {data?.map((item) => (
          <label
            className="cursor-pointer flex  bg-gray-300 items-center rounded-md m-1 py-2 px-3 font-semibold hover:bg-gray-400"
            key={item.id}
          >
            <input
              type="radio"
              className="form-radio opacity-30 mr-2 checked:opacity-75 cursor-pointer"
              name="filters"
              value={item.tag}
              onChange={handleCardChange}
            />
            <span className="uppercase text-sm mr-auto text-slate-600">
              {item.tag}
            </span>
          </label>
        ))}

        <div
          className="cursor-pointer flex bg-btnYellow bg-opacity-70 items-center rounded-xl py-2 m-1  px-3 justify-between hover:bg-opacity-100"
          onClick={() => setOpenModalEdit(!openModalEdit)}
        >
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
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="uppercase font-semibold text-sm text-slate-600 text-center m-2">
              Add New Tag
            </h5>
            <div className="flex">
              <input
                {...register("tag")}
                type="text"
                placeholder="Type here"
                className={`p-2 border rounded-sm w-full focus:outline-none m-1 text-slate-600 ${
                  errors.tag ? "border-red-500" : ""
                }`}
              />
              <button
                type="submit"
                className="cursor-pointer flex bg-btnYellow bg-opacity-70 items-center rounded-xl py-1 m-1  px-3 justify-between hover:bg-opacity-100"
              >
                Submit
              </button>
            </div>
            {errors.tag && (
              <p className="text-red-500 text-sm m-1">{errors.tag.message}</p>
            )}
          </form>
        </Modal>
      </div>
    </div>
  );
};
{
  /* <div
            className="cursor-pointer flex  bg-gray-300 items-center rounded-md m-1 py-2 px-3 font-semibold hover:bg-gray-400"
            key={item.id}
          >
            <span className="uppercase text-sm mr-auto text-slate-600">
              {item.tag}
            </span>
          </div> */
}
