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
  const [city, setCity] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, email, mobile, address, password, city };

    if (userType === "Admin") {
      axios
        .post("http://localhost:8081/AddAdmin", data)
        .then((res) => {
          toast.info(res.data);
          ClearAll();
        })
        .catch((err) => {
          toast.error(err.data);
          console.log(err);
        });
    } else if (userType === "User") {
      axios
        .post("http://localhost:8081/User/AddUser", data)
        .then((res) => {
          toast.info(res.data);
          ClearAll();
        })
        .catch((err) => {
          toast.error(err.data);
          console.log(err);
        });
    }
    else {
    }
  }

  function ClearAll() {
    setUserType("");
    setName("");
    setEmail("");
    setAddress("");
    setMobile("");
    setPassword("");
    setCity("");
  }

  return (
    <div>
      <div className="container m-3 mx-auto">
      <h2 className="text-center">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <select
            className="form-select text-center"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="" hidden>---Select Usertype---</option>
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
          <label> Password </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Address</label>
          <input
            type="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
          <label>Place</label>
          <input
            type="place"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <div className="text-center">
            <button className="btn btn-primary mt-3" type="submit">
              Sign-Up
            </button>
          </div>
          <div>
            Already a user? <Link to="/Login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}