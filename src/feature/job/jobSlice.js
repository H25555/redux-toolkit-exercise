import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import axios from 'axios';
import { clearStore, logoutUser } from '../user/userSlice';
import { getAllJobs, hideLoading, showLoading } from './allJobsSlice';

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: ''
}
export const createJob = createAsyncThunk('job/createJob', async (job, thunkAPI) => {
    try {
        const resp = await axios.post('https://jobify-prod.herokuapp.com/api/v1/toolkit/jobs', job, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        });
        thunkAPI.dispatch(clearValues());
        return resp.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})
export const deleteJob = createAsyncThunk('job/deleteJob', async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const resp = await axios.delete(`https://jobify-prod.herokuapp.com/api/v1/toolkit/jobs/${jobId}`, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(getAllJobs());
        return resp.data;
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})
export const updateJob = createAsyncThunk('job/updateJob', async ({ jobId, job }, thunkAPI) => {
    try {
        const resp = await axios.patch(`https://jobify-prod.herokuapp.com/api/v1/toolkit/jobs/${jobId}`, job, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        });
        thunkAPI.dispatch(clearValues());
        return resp.data
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})
const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: () => {
            return {
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location || '',
            }
        },
        setEditJob: (state, { payload }) => {
            console.log('edit');
            return { ...state, isEditing: true, ...payload };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createJob.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(createJob.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Thêm thành công');
            })
            .addCase(createJob.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(deleteJob.fulfilled, (state) => {
                toast.success('Xóa thành công!')
            })
            .addCase(deleteJob.rejected, (state, { payload }) => {
                toast.error(payload)
            })
            .addCase(updateJob.pending, (state)=> {
                state.isLoading = true; 
            })
            .addCase(updateJob.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                toast.success('Sửa thành công')
            })
            .addCase(updateJob.rejected, (state, {payload})=> {
                state.isLoading = false;
                toast.error(payload)
            })
    }
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;