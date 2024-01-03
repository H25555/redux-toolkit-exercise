import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user/userSlice";
import jobSlice from './feature/job/jobSlice'
import allJobsSlice from "./feature/job/allJobsSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        job: jobSlice,
        allJobs: allJobsSlice
    }
})
