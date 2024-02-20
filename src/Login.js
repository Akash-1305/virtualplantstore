import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from "react-router-dom";

export default function Login() {
    
    const [usertype, setUsertype] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const obj = { email: username, password, userType:usertype };
        axios
            .post("http://localhost:8082/LoginVerify", obj)
            .then((res) => {
                if (res.data === "admin") {
                    navigate("/admin");
                    alert("Login successfully");
                }
                if (res.data === "user") {
                    navigate("/user");
                    alert("Login successfully");
                }
            })
            .catch((err) => {
                alert("Failed to login");
            });
    }
    return (
        <div>
            <div className="card p-3 w-50 mx-auto">
                <h2 className="text-center">Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <label>Select Usertype</label>
                    <select
                        className="form-select text-center"
                        value={usertype}
                        onChange={(e) => setUsertype(e.target.value)}
                        required
                    >
                        <option value="" hidden>
                            Select Usertype
                        </option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <label>Enter email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Enter Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button to="/" className="btn btn-primary" type="submit">
                        Home
                    </button>
                </form>
            </div>
        </div>
    );

}

