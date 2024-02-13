import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Filter, TagResp } from "../../../types/global-interfaces";

export const apiTask = createApi({
  reducerPath: "apiTask",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65bd433bb51f9b29e93337f2.mockapi.io",
  }),
  tagTypes: ["Tasks", "Tags"],
  endpoints: (builder) => ({
    getAllTasks: builder.query<ApiResponse[], void>({
      query: () => "/tasks",
      transformResponse: (res: ApiResponse[]) =>
        res.sort((a, b) => b.id - a.id),
      providesTags: ["Tasks"],
    }),

    getTasksByFilter: builder.query({
      query: ({ filter }: { filter: Filter }) => {
        switch (filter.type) {
          case "search":
            if (filter.value === "") {
              // filterStatusVal = true
              return `/tasks`;
            }
            return `/tasks?title=${filter.value}`;
          case "status":
            if (filter.value === "completed") {
              return `/tasks?status=${true}`;
            } else if (filter.value === "pending") {
              return `/tasks?status=${false}`;
            }
            return `/tasks`;
          default:
            return "/tasks";
        }
      },
      transformResponse: (res: ApiResponse[], queryApi, arg) => {
        const { filter } = arg;
        if (filter?.type === "tags") {
          return res?.filter((task) =>
            task.tags.some((tag) => tag.tag === filter.value)
          );
        }
        return res;
      },
    }),
    getSingleTask: builder.query<ApiResponse, number>({
      query: (id) => `/tasks/${id}`,
      providesTags: ["Tasks"],
    }),
    getAllTags: builder.query<TagResp[], void>({
      query: () => "/tags",
      providesTags: ["Tags"],
    }),
    addTag: builder.mutation({
      query: (tag) => ({
        url: "/tags",
        method: "POST",
        body: tag,
      }),
      invalidatesTags: ["Tags"],
    }),
    addNewTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ data, id }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTasksByFilterQuery,
  useGetSingleTaskQuery,
  useGetAllTagsQuery,
  useAddTagMutation,
  useUpdateTaskMutation,
  useAddNewTaskMutation,
  useDeleteTaskMutation,
} = apiTask;
