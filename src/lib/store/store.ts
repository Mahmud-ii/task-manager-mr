import { apiTask } from "../features/apiTask";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import tagSliceReducer from "../features/tagSlice";

export const store = configureStore({
  reducer: {
    [apiTask.reducerPath]: apiTask.reducer,

    tag: tagSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiTask.middleware]),
});

setupListeners(store.dispatch);
