"use client";
import { Col } from "../../components/layouts";
import { TagsCards } from "../ui/TagsCards";
import { StatusCards } from "../ui/StatusCards";
import { useDispatch, useSelector } from "react-redux";
import { FC, ReactElement, useEffect, useState } from "react";
import { SearchBar } from "../ui/SearchBar";
import { AuthBtn } from "../ui/AuthBtn";
import { useGetTasksByFilterQuery } from "@/lib/features/apiTask";
import { getTasks } from "@/lib/features/tagSlice";
import { TRootState } from "../../../../types/global-interfaces";

const Navbar: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [colShow, setColShow] = useState(false);
  const { filter } = useSelector((state: TRootState) => state.tag);
  const { data, isLoading } = useGetTasksByFilterQuery({ filter });

  useEffect(() => {
    dispatch(getTasks(data));
  }, [dispatch, data]);

  return (
    <>
      {colShow ? (
        <Col className="max-h-[95vh] w-1/2 sm:w-2/3 md:w-1/2 md:absolute left-0 md:top-0 md:bottom-0 md:min-h-screen mx-auto bg-bgGray py-6 px-4 rounded-xl flex flex-col justify-between ">
          <div className="flex items-center justify-between">
            <h1 className="h1 font-bold text-xl text-gray-600">Menu</h1>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-125 transition-transform"
              onClick={() => setColShow(!colShow)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <SearchBar />
          <TagsCards />
          <StatusCards />
          <AuthBtn />
        </Col>
      ) : (
        <div className="absolute md:p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 md:w-10 md:h-10 cursor-pointer hover:scale-125 transition-transform"
            onClick={() => setColShow(!colShow)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Navbar;
