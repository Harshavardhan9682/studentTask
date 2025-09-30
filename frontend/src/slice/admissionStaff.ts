import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AdmissionStaffData, FetchAdmissionStaffParams, FetchAdmissionStaffResponse } from "../type/admissionStaff";
import axios from "axios";
import axiosInstance from "../axiosInstance/axiosInstance";




export const fetchAdmissionStaff = createAsyncThunk<
  FetchAdmissionStaffResponse ,
  FetchAdmissionStaffParams,
  { rejectValue: string }
>("admissionStaff/fetch", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/admissionStaff", {
      params: {
        page: params.page,
        limit: params.limit,
        query: params.query || "",
      },
    });
    console.log(response.data,"fetching data")
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch admissionStaff");
  }
});
// console.log(fetchAdmissionStaff,"this is from")


export const addAdmissionStaff = createAsyncThunk<AdmissionStaffData, AdmissionStaffData>(
  "admissionStaff/addStudent",
  async (student, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/admissionStaff", student);
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
export const updateAdmissionStaff = createAsyncThunk<AdmissionStaffData, { id: string; updatedData: AdmissionStaffData }>(
  "admissionStaff/updateStudent",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/admissionStaff/${id}`, updatedData);
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
export const deleteAdmissionStaff= createAsyncThunk<string, string>(
  "admissionStaff/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admissionStaff/${id}`);
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



interface AdmissionStaffState {
  admissionStaff: AdmissionStaffData[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  query: string;
}

const initialState: AdmissionStaffState = {
  admissionStaff: [],  
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 0,
  query: "",
};



const admissionStaffSlice = createSlice({
  name: "admissionStaff",
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
      .addCase(fetchAdmissionStaff .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmissionStaff .fulfilled, (state, action) => {
        state.loading = false;
        state.admissionStaff= action.payload.AdmissionStaff;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAdmissionStaff .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addAdmissionStaff.fulfilled, (state, action) => {
        state.admissionStaff.push(action.payload);
      })
      .addCase(updateAdmissionStaff.fulfilled, (state, action) => {
        const idx = state.admissionStaff.findIndex((s) => s._id === action.payload._id);
        if (idx >= 0) state.admissionStaff[idx] = action.payload;
      })
      .addCase(deleteAdmissionStaff.fulfilled, (state, action) => {
        // state.admissionStaff= state.AdminStaff.filter((s) => s._id !== action.payload);
      });
  },
});

export const { setSearchQuery, setPage, setLimit } = admissionStaffSlice.actions;
export default admissionStaffSlice.reducer;





