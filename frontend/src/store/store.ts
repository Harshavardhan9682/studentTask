import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slice/studentSlice";
import admissionStaffRendcer from "../slice/admissionStaff"
import teacherReducer from "../slice/teacherSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    students: studentReducer,
    staff:admissionStaffRendcer,
    teachers:teacherReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
