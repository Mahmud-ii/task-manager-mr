"use client";

import { Col } from "../../components/layouts";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectTagsDropdown } from "../../components/ui/SelectTagsDropdown";
import { clearTags, removeListedTag } from "@/lib/features/tagSlice";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/lib/features/apiTask";
import { useRouter } from "next/navigation";
import {
  FormData,
  TRootState,
  TTasksProps,
  schema,
} from "../../../../types/global-interfaces";

const EditTaskForm: FC<TTasksProps> = ({ singleProduct, id }) => {
  const [colShow, setColShow] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // defaultValues: productObj,
  });
  watch();

  const { selectedTags } = useSelector((state: TRootState) => state.tag);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    if (singleProduct == undefined) return;

    const { description, status, tags, title } = singleProduct;

    setValue("title", title);
    setValue("description", description);
    setValue("tags", tags);
    setValue("status", status);

    tags?.forEach((item) => {
      dispatch(removeListedTag(item.id));
    });
  }, [singleProduct, setValue, dispatch]);

  useEffect(() => {
    setValue("tags", [...selectedTags]);
  }, [setValue, selectedTags]);

  const onSubmitEdit: SubmitHandler<FormData> = (data) => {
    updateTask({ data, id });
    reset();
    dispatch(clearTags());
    router.push("/tasks");
  };

  const onSubmitDel: SubmitHandler<FormData> = (data) => {
    deleteTask(id);
    reset();
    dispatch(clearTags());
    router.push("/tasks");
  };
  return (
    <>
      {colShow ? (
        <Col className=" w-2/5 max-h-[95vh] mx-auto bg-bgGray py-6 px-4 rounded-xl flex flex-col sm:w-4/5 sm:absolute sm:top-0 sm:bottom-0 sm:min-h-screen sm:right-0 sm:rounded-r-none sm:rounded-b-none">
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
                onClick={() => {
                  router.push("/tasks");
                }}
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
          <form className="flex flex-col gap-2 mt-2 grow">
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

            <div className="flex items-center justify-between mt-auto">
              <button
                type="submit"
                className="bg-gray-400 p-3 ml-2 bg-opacity-80 text-lg font-medium rounded-md hover:bg-opacity-65 hover:scale-110 transition-transform"
                onClick={handleSubmit(onSubmitDel)}
              >
                Delete Task
              </button>
              <button
                type="submit"
                className="bg-btnYellow p-3 ml-2 bg-opacity-80 text-lg font-medium rounded-md hover:scale-110 hover:bg-opacity-65 transition-transform"
                onClick={handleSubmit(onSubmitEdit)}
              >
                Save Changes
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

export default EditTaskForm;
