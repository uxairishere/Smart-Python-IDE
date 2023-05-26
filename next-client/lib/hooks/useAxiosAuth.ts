// import axios from "axios";
// import jwt_decode from "jwt-decode";


// const AxiosTOKEN = (user:any, refreshToken:any) => {

//     const axiosJWT = axios.create()

//     axiosJWT.interceptors.request.use(
//         async (config) => {
//             let currentDate = new Date();
//             const decodedToken = jwt_decode(user.accessToken);
//             if (decodedToken.exp * 1000 < currentDate.getTime()) {
//                 const data = await refreshToken;
//                 config.headers["authorization"] = "Bearer " + data.accessToken;
//             }
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );

//     return
// }

// export default AxiosTOKEN