import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Filter, StateType, TagResp } from "../../../types/global-interfaces";

const initialState: StateType = {
  allTasks: [],
  listedTags: [],
  selectedTags: [],
  filter: {
    type: "search", // default filter type
    value: "", // default filter value
  },
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter.type = action.payload.type;
      state.filter.value = action.payload.value;
    },
    clearFilter: (state, action: PayloadAction<Filter>) => {
      state.filter.type = action.payload.type;
      state.filter.value = action.payload.value;
    },
    getTags: (state, action) => {
      state.selectedTags = [];
      state.listedTags = action.payload;
    },
    getTasks: (state, action) => {
      state.allTasks = action.payload;
    },
    clearTags: (state) => {
      state.listedTags = [...state.listedTags, ...state.selectedTags];
      state.selectedTags = [];
    },
    removeListedTag: (state: StateType, action) => {
      const id = action.payload;
      let newItem: TagResp[] = state.listedTags?.filter(
        (item: TagResp) => item.id === id
      );

      state.listedTags = state.listedTags?.filter(
        (item: TagResp) => item.id !== id
      );
      state.selectedTags.push(newItem[0]);
    },
    removeSelectedTag: (state: StateType, action) => {
      let newItem: TagResp[] = state.selectedTags?.filter(
        (item: TagResp) => item.id === action.payload
      );
      state.selectedTags = state.selectedTags?.filter(
        (item: TagResp) => item.id !== action.payload
      );
      state.listedTags.push(newItem[0]);
    },
  },
});

export const {
  setFilter,
  clearFilter,
  getTags,
  getTasks,
  clearTags,
  removeListedTag,
  removeSelectedTag,
} = tagSlice.actions;
export default tagSlice.reducer;
