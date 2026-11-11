import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    jobsLoading: false,
    jobsError: null,
    jobsQuery: "",
    activeJobsRequestId: null,
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    loading: false,
    allAppliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    //action
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    startJobsRequest: (state, action) => {
      state.jobsLoading = true;
      state.jobsError = null;
      state.jobsQuery = action.payload.query;
      state.activeJobsRequestId = action.payload.requestId;
    },
    finishJobsRequest: (state, action) => {
      if (state.activeJobsRequestId !== action.payload.requestId) return;
      state.allJobs = action.payload.jobs;
      state.jobsLoading = false;
      state.jobsError = null;
      state.activeJobsRequestId = null;
    },
    failJobsRequest: (state, action) => {
      if (state.activeJobsRequestId !== action.payload.requestId) return;
      state.jobsLoading = false;
      state.jobsError = action.payload.message;
      state.activeJobsRequestId = null;
    },
    cancelJobsRequest: (state, action) => {
      if (state.activeJobsRequestId !== action.payload.requestId) return;
      state.jobsLoading = false;
      state.activeJobsRequestId = null;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (store, action) => {
      store.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery =
        typeof action.payload === "string"
          ? action.payload.trim().replace(/\s+/g, " ")
          : "";
    },
  },
});

export const {
  setAllJobs,
  startJobsRequest,
  finishJobsRequest,
  failJobsRequest,
  cancelJobsRequest,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
