import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();

    const data = { name, email, mobile, address, password };

    if (userType === "Admin") {
      axios
        .post("http://localhost:8081/AddAdmin", data)
        .then((res) => {
          alert(res.data); 
          ClearAll();
          alert ("Farmer Added Succesfully")
        })
        .catch((err) => {
          toast.error(err.response.data); 
          console.log(err);
          alert("Error")
        });
    } else if (userType === "User") {
      axios
        .post("http://localhost:3401/AddUser", data)
        .then((res) => {
          toast.success(res.data); 
          ClearAll();
        })
        .catch((err) => {
          toast.error(err.response.data); 
          console.log(err);
        });
    }
    else
    {
      alert("")
    }
  }    

  function ClearAll() {
    setUserType("");
    setName("");
    setEmail("");
    setAddress("");
    setMobile("");
    setPassword("");
  }

  return (
    <div>
      <div className="card p-3 w-50 mx-auto bg-light">
        <h1 className="mb-5 mt-3 text-center">Sign-up</h1>

        <form onSubmit={handleSubmit}>
          <select
            className="form-select text-center"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="" hidden>----Select Usertype---</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <br />
          
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            pattern="[A-Za-z\s]*"
            title="Only letters are allowed"
          />
          <label> Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Mobile Number</label>
          <input
            type="mobile"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            pattern="[0-9]{10}"
            minLength={10}
            title="Only ten digits are allowed"
          />

          <label> Password </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            pattern="^(?=.[a-zA-Z]{3})(?=.\d{3}).{6}$"
          />
          <label>Address</label>
          <input
            type="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="text-center">
            <button className="btn btn-info mt-3" type="submit">
              Sign-Up
            </button>
          </div>
          <div>
            Already a user? <Link to ="/Login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}