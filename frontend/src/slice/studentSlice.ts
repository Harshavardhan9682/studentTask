import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Studentdata, FetchStudentsParams, FetchStudentsResponse } from "../type/student";
import axios from "axios";
import axiosInstance from "../axiosInstance/axiosInstance";


type FeeData = {
  tuition?: number;
  transport?: number;
  lab?: number;
};
type FromToParams = {
  fromDate: string;
  toDate: string;
};
//fetching
export const fetchStudent = createAsyncThunk<
  FetchStudentsResponse,
  FetchStudentsParams,
  { rejectValue: string }
>("students/fetch", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/student", {
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

//addstudent
export const addStudent = createAsyncThunk<Studentdata, Studentdata>(
  "students/addStudent",
  async (student, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/student", student);
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

// Update Student
export const updateStudent = createAsyncThunk<Studentdata, { id: string; updatedData: Studentdata }>(
  "students/updateStudent",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/student/${id}`, updatedData);
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

// Delete Student
export const deleteStudent = createAsyncThunk<string, string>(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/student/${id}`);
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
//From to  
export const fromTo = createAsyncThunk(
  "students/fromTo",
  async ({ fromDate, toDate }: FromToParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/student/date", {
        params: { fromDate, toDate },
      });

      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
//fee
export const feeManagement = createAsyncThunk<
  string, 
  { id: string; fees: FeeData }, 
  { rejectValue: string }
>("students/feeManagement", async ({ id, fees }, { rejectWithValue }) => {
  try {
    await axiosInstance.put(`/student/${id}/fee`, fees);
    return id; 
  } catch (error) {
    let errMessage = "Something went wrong";
    if (axios.isAxiosError(error)) {
      errMessage = error.response?.data?.message || error.message;
    }
    return rejectWithValue(errMessage);
  }
});


// slice state
interface StudentState {
  students: Studentdata[];
  loading: boolean;
  error: string | null;
  query: string;
  page: number;
  limit: number;
  totalPages: number;
}

// initial state
const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  query: "",
  page: 1,
  limit: 10,
  totalPages: 1,
};


const studentSlice = createSlice({
  name: "students",
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
      .addCase(fetchStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const idx = state.students.findIndex((s) => s._id === action.payload._id);
        if (idx >= 0) state.students[idx] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students= state.students.filter((s) => s._id !== action.payload);
      })
      .addCase(fromTo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fromTo.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fromTo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setPage, setLimit } = studentSlice.actions;
export default studentSlice.reducer;





