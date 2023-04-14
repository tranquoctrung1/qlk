import { configureStore } from "@reduxjs/toolkit";
import OpenSidebarSlice from "./features/openSidebar";

export const store = configureStore({
  reducer: {
    open: OpenSidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
