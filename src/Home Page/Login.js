import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"

export default function Login() {

    const [usertype, setUsertype] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const obj = { email: username, password, userType: usertype };
        axios
            .post("http://localhost:8081/LoginVerify", obj)
            .then((res) => {
                if (res.data === "admin") {
                    toast.success("Login Succesful")
                    navigate("/Admin");
                }
                if (res.data === "user") {
                    toast.success("Login Succesful")
                    navigate("/User");
                }
            })
            .catch((err) => {
                toast.error("Failed to Login")
                console.error("Error during login", err);
            });
    }
    return (
        <div>
            <div className="card m-3 p-3 w-50 mx-auto">
                <h2 className="text-center">Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <label></label>
                    <select
                        className="form-select text-center mb-3"
                        value={usertype}
                        onChange={(e) => setUsertype(e.target.value)}
                        required
                    >
                        <option value="" hidden>
                            ---Select Usertype---
                        </option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <label>Enter email</label>
                    <input
                        type="email"
                        className="form-control mb-3"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Enter Password</label>
                    <input
                        type="password"
                        className="form-control mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="text-center">
                        <button to="/" className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                    <div>
                        Not Registered? <Link to="/Register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

