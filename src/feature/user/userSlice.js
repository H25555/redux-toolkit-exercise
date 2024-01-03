import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';
import { clearValues } from '../job/jobSlice';

const initialState = {
    isLoading: false,
    isSideBarOpen: false,
    user: getUserFromLocalStorage()
}
export const registerUser = createAsyncThunk('user/registerUser',
    async (user, thunkAPI) => {
        try {
            const resp = await axios.post('https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/register', user);
            return resp.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.msg)
        }
    })
export const loginUser = createAsyncThunk('user/loginUser',
    async (user, thunkAPI) => {
        try {
            const resp = await axios.post('https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/login', user)
            return resp.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.msg)
        }
    })
export const updateUser = createAsyncThunk(
    'user/updateUser', async (user, thunkAPI) => {
        try {
            const resp = await axios.patch('https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/updateUser', user, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            })
            return resp.data;
        } catch (error) {
            console.log(error.response);
            thunkAPI.rejectWithValue(error.response.data.msg)
        }

    }
)
export const clearStore = createAsyncThunk('user/clearStore', async (message, thunkAPI) => {
    try {
        thunkAPI.dispatch(logoutUser(message));
        thunkAPI.dispatch(clearValues())
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
})
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        toggleSidebar: (state) => {
            state.isSideBarOpen = !state.isSideBarOpen
        },
        logoutUser: (state, { payload }) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
            if (payload) {
                toast.success(payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                if (!payload) {
                    state.isLoading = false;
                    toast.error(payload)
                } else {
                    const { user } = payload;
                    state.isLoading = false;
                    state.user = user;
                    addUserToLocalStorage(user)
                    toast.success(`Welcome ${user.name}`);
                }
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                if (!payload) {
                    state.isLoading = false;
                    toast.error(payload)
                } else {
                    const { user } = payload;
                    state.isLoading = false;
                    state.user = user;
                    addUserToLocalStorage(user)
                    toast.success(`Welcome back ${user.name}`);
                }
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                if (!payload) {
                    state.isLoading = false;
                    toast.error(payload)
                } else {
                    const { user } = payload;
                    state.isLoading = false;
                    state.user = user;
                    addUserToLocalStorage(user);
                    toast.success(`Update Successful!`);
                }
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)
            })
    }
});


export const { logoutUser, toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
