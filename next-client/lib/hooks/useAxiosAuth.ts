// import axios from "axios";
// import { refreshToken } from "./useRefreshAuth";
// import jwt_decode from "jwt-decode";

// export const axiosJWT = axios.create()

// axiosJWT.interceptors.request.use(
//     async (config) => {
//         let currentDate = new Date();
//         const decodedToken = jwt_decode(user.accessToken);
//         if (decodedToken.exp * 1000 < currentDate.getTime()) {
//             const data = await refreshToken();
//             config.headers["authorization"] = "Bearer " + data.accessToken;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );