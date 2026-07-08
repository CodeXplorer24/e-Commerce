import axios from "axios"
import {store} from "../app/store.js"
import { resetCredentials } from "@/features/auth/authSlice.js";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // Automatically sends your HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

//don't need it as browser handle automatically 
// api.interceptors.request.use(
//     (config) => {
//         const accessToken = 
//     }
// )
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const orgReq = error.config;

        if (error.response?.status === 401 && !orgReq._retry) {
            orgReq._retry = true;

            try {
                //Use plain axios to bypass this interceptor configuration entirely
                await axios.post(
                    "http://localhost:8000/api/v1/auth/refresh",
                    {},
                    { withCredentials: true } // Keeps cookies active for rotation
                );
                return api(orgReq); //retry original request
            }
            catch (err) {
                // If the refresh token itself is expired, session is dead. Force clear client app state.
                // window.location.href = "/login";
                // store.dispatch(logoutUser()); might create infinite loop use reducers instead of thunk

                store.dispatch(resetCredentials());
                return Promise.reject(err);
            }
        }
    return Promise.reject(error);
    }
);

export default api;