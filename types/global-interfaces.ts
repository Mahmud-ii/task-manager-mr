import { z } from "zod";

export interface TagResp {
  id: number;
  tag: string;
}
export interface ApiResponse {
  id: number;
  title: string;
  description: string;
  tags: TagResp[] | [];
  status: boolean;
}

export type StateType = {
  allTasks: ApiResponse[];
  listedTags: TagResp[];
  selectedTags: TagResp[];
  filter: Filter;
};

export interface TRootState {
  apiTask: {};
  tag: {
    allTasks: ApiResponse[];
    listedTags: TagResp[];
    selectedTags: TagResp[];
    filter: Filter;
  };
}

export interface Filter {
  type: "search" | "tags" | "status";
  value: string;
}

export interface FormData {
  title: string;
  description: string;
  tags: TagResp[] | [];
  status: boolean;
}
export const schema = z.object({
  title: z.string().min(1, { message: "Task name is required" }),
  description: z.string(),
  tags: z.array(
    z.object({
      tag: z.string(),
      id: z.string(),
    })
  ),
  status: z.boolean(),
});

export interface TTasksProps {
  singleProduct: ApiResponse | undefined; // Adjust the type based on your form data structure
  id: string;
}

export interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}
