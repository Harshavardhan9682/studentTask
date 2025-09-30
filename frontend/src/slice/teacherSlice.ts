import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TeachersData, FetchTeachersParams, FetchTeachersResponse } from "../type/teacher";
import axios from "axios";
import axiosInstance from "../axiosInstance/axiosInstance";




export const fetchTeacher = createAsyncThunk<
  FetchTeachersResponse,
  FetchTeachersParams,
  { rejectValue: string }
>("teachers/fetch", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/teacher", {
      params: {
        page: params.page,
        limit: params.limit,
        query: params.query || "",
      },
    });
    console.log(response.data)
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch students");
  }
});


export const addTeacher = createAsyncThunk<TeachersData, TeachersData>(
  "teachers/addStudent",
  async (teacher, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/teacher", teacher);
      return data;
    } catch (error) {
      let errMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errMessage = error.response?.data?.message || error.message;
      }
      return rejectWithValue(errMessage);
    }
  }
);


export const updateTeacher = createAsyncThunk<TeachersData, { id: string; updatedData: TeachersData }>(
  "teachers/updateTeacher",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/teacher/${id}`, updatedData);
      console.log(data,"data")
      return data;
    } catch (error) {
      let errMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errMessage = error.response?.data?.message || error.message;
      }
      return rejectWithValue(errMessage);
    }
  }
);

export const deleteTeacher = createAsyncThunk<string, string>(
  "teachers/deleteTeacher",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/teacher/${id}`);
       console.log(id)
      return id;
     
    } catch (error) {
      let errMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errMessage = error.response?.data?.message || error.message;
      }
      return rejectWithValue(errMessage);
    }
  }
);


// slice state
interface TeacherState {
  teachers: TeachersData[];
  loading: boolean;
  error: string | null;
  query: string;
  page: number;
  limit: number;
  totalPages: number;
}

// initial state
const initialState: TeacherState = {
  teachers: [],
  loading: false,
  error: null,
  query: "",
  page: 1,
  limit: 10,
  totalPages: 1,
};


const teacherSlice = createSlice({
  name: "teachers",
  initialState,




  
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {// current state , checking it is string  payload should be string action is the object 
      console.log(action.payload)
      state.query = action.payload; 
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {//handles the actions not defined in the renducer object 
    builder//Its us a special object 
      .addCase(fetchTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload.teachers;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const idx = state.teachers.findIndex((s) => s._id === action.payload._id);
        if (idx >= 0) state.teachers[idx] = action.payload;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers= state.teachers.filter((s) => s._id !== action.payload);
      });
  },
});

export const { setSearchQuery, setPage, setLimit } = teacherSlice.actions;
export default teacherSlice.reducer;





