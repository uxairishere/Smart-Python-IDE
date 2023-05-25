import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";

export default function Login() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const refreshToken = async () => {
        try {
            if (!user || !user.refreshToken) {
                console.log("User or refreshToken is missing");
                return;
            }
    
            const res = await axios.post("http://localhost:5000/auth/api/token", { token: user.refreshToken });
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/auth/api/login", { email: username, password });
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    const handleGetUsers = async () => {
        setSuccess(false);
        setError(false);
        try {
            const allusers = await axiosJWT.post("http://localhost:5000/auth/api/users", { "user": "uxair" }, {
                headers: { authorization: "Bearer " + user.accessToken },
            });
            console.log(allusers)
            console.log("success")
            setSuccess(true);
        } catch (err) {
            console.log("failed")
            setError(true);
            console.log(err)
        }
    }
    return (
        <>
            {user ?

                <>The dashboard
                    <button onClick={handleGetUsers}>GetUsers</button>
                    <br />
                    {error && (
                        <span className="error">
                            You are not allowed to delete this user!
                        </span>
                    )}
                    {success && (
                        <span className="success">
                            User has been deleted successfully...
                        </span>
                    )}
                </>


                :
                <form onSubmit={handleSubmit}>
                    <span className="formTitle">Login</span>
                    <input
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="submitButton">
                        Login
                    </button>
                </form>


            }
        </>
    )
}
