import { createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "@/api/api.js";


const registerUser = createAsyncThunk(
    "auth/register",
    async (formData, thunkAPI) => {
       try {
        const resp = await api.post('/auth/register', formData);
        return resp.data;
       } catch (error) {
        const msg = error.response?.data || {message: error.message || "Registration Failed"}
        return thunkAPI.rejectWithValue(msg);
       }
    }
)

const loginUser = createAsyncThunk(
    "auth/login",
    async(formData, thunkAPI) => {
        try {
            const resp = await api.post('/auth/login', formData)
            console.log("Form Data: ", formData);
            console.log("Thunk Response from server: ", resp);
            // console.log("Data from Thunk response: ", resp.data);
            return resp.data;
        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
            const msg = error.response?.data || {error: error.message || "Login Failed"}
            console.log(msg);
            return thunkAPI.rejectWithValue(msg);
        }
    }
)

const logoutUser = createAsyncThunk(
    "auth/logout",
    async(_, thunkAPI) => {
        try {
            const resp = await api.post('/auth/logout');
            return resp.data;
        } catch (error) {
            const msg = error.response?.data || {error: error.message || "Logout Failed"}
            return thunkAPI.rejectWithValue(msg);
        }
    }
)

const checkAuth = createAsyncThunk(
    "/auth/check-auth",
    async (_, thunkAPI) => {
        try {
            const resp = await api.get(
                "/auth/check-auth",
                {
                    headers: {
                        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    }
                }
            )
            return resp.data;
        } catch (error) {
            const msg = error.response?.data  || {error: error.message || "Authentication Failed"}
            return thunkAPI.rejectWithValue(msg);
        }
    }
)
export {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth
}