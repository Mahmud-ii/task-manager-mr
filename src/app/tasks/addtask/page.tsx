"use client";

import { Col } from "../../components/layouts";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectTagsDropdown } from "../../components/ui/SelectTagsDropdown";
import { clearTags } from "@/lib/features/tagSlice";
import { useAddNewTaskMutation } from "@/lib/features/apiTask";
import {
  FormData,
  TRootState,
  schema,
} from "../../../../types/global-interfaces";

const AddTaskForm: FC = () => {
  const [colShow, setColShow] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const { selectedTags } = useSelector((state: TRootState) => state.tag);
  const [addNewTask] = useAddNewTaskMutation();

  useEffect(() => {
    setValue("tags", [...selectedTags]);
  }, [selectedTags, setValue]);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    addNewTask(data);
    reset();
    dispatch(clearTags());
  };
  return (
    <>
      {colShow ? (
        <Col className=" w-3/4 max-h-[95vh] mx-auto bg-bgGray py-6 px-4 rounded-xl flex flex-col sm:w-4/5 sm:absolute sm:top-0 sm:bottom-0 sm:min-h-screen sm:right-0 sm:rounded-r-none sm:rounded-b-none">
          <div className="flex items-center justify-between">
            <h1 className="h1 font-bold text-xl text-gray-600">Task:</h1>
            <Link href={"/tasks"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:scale-125 transition-transform"
                // onClick={() => setColShow(!colShow)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-2 grow"
          >
            <input
              {...register("title")}
              type="text"
              className={`p-2 border rounded w-full focus:outline-none ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder="Task Name"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            <textarea
              {...register("description")}
              placeholder="Description"
              name="description"
              rows={3}
              cols={40}
              className="outline-none p-2"
            ></textarea>

            <SelectTagsDropdown register={register} />
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
            )}

            <div>
              <h6 className="uppercase font-medium text-slate-600">Status:</h6>
              <br />
              <label className="cursor-pointer p-2 bg-gray-300 rounded-lg inline w-full mx-auto">
                Completed
                <input
                  {...register("status")}
                  type="checkbox"
                  className="ml-2 outline-none"
                />
              </label>
            </div>

            <div className="flex items-center justify-center mt-auto">
              <button
                type="submit"
                className="bg-btnYellow p-3 ml-2 bg-opacity-80 text-lg font-medium rounded-md hover:bg-opacity-65"
              >
                Add Task
              </button>
            </div>
          </form>
        </Col>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddTaskForm;
