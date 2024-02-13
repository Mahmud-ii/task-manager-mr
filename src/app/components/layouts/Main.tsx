"use client";
import { ReactNode, useEffect } from "react";
import { Col } from "../layouts";
import AddTask from "../ui/AddTaskButton";
import Link from "next/link";
import {
  useGetAllTasksQuery,
  useGetAllTagsQuery,
} from "@/lib/features/apiTask";
import Image from "next/image";
import Spinner from "../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, getTasks } from "@/lib/features/tagSlice";
import {
  ApiResponse,
  TRootState,
  TagResp,
} from "../../../../types/global-interfaces";

function Main() {
  const dispatch = useDispatch();
  const { data: tagsArr } = useGetAllTagsQuery();
  const { data, isError, isLoading, isSuccess } = useGetAllTasksQuery();

  const { allTasks } = useSelector((state: TRootState) => state.tag);

  let tasks: ApiResponse[] | undefined = allTasks;

  useEffect(() => {
    dispatch(getTasks(data));
  }, [dispatch, data]);

  return (
    <Col className=" w-full mx-auto py-6 sm:py-2 sm:pt-6 px-4 rounded-xl flex flex-col justify-start overflow-y-scroll  max-h-[94vh] sm:max-h-full main-lists">
      <div>
        <Link href={"/"}>
          <h1
            className="font-bold text-3xl text-center text-slate-800"
            onClick={() => dispatch(clearFilter({ type: "search", value: "" }))}
          >
            Task Manager
          </h1>
        </Link>
      </div>
      <Link href={`/tasks/addtask`}>
        <AddTask />
      </Link>
      {/* api */}

      {!isLoading ? (
        tasks?.length != 0 ? (
          tasks?.map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`}>
              <div className="w-full my-2  cursor-pointer flex bg-gray-300 bg-opacity-0 items-center border-b-2 px-3 py-3 justify-start hover:bg-opacity-50">
                <span className="text-sm text-slate-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm font-medium  text-slate-600">
                  {task.title}
                </span>
                <span className="text-sm text-slate-600 ml-auto">
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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-slate-500 font-semibold text-center">
            No tasks to show
          </div>
        )
      ) : (
        <Spinner />
      )}
    </Col>
  );
}

export default Main;
