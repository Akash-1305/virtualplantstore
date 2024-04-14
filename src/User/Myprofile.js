import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseurl } from "../App";

export default function Myprofile() {
    const [user, setUser] = useState({})
    const loggedUser = sessionStorage.getItem("User");

    useEffect(() => {
        getUser()
    }, [])


    function getUser() {
        axios
            .get(baseurl + `/User/GetUser/${loggedUser}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.data);
            })
    }

    useEffect(() => {
        setInput({ ...user });
    }, [user]);

    const [input, setInput] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        city: ""
    })

    const handleChange = (e) => {
        setInput((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }

    const handlePlaceOrder = () => {
        const orderData = {
            name: input.name,
            email: input.email,
            mobile: input.mobile,
            address: input.address,
            city: input.city
        }
        axios
            .post("http://localhost:8081/User/UpdateProfile", orderData)
            .then((res) => {
                toast.success(res.data);
            })
            .catch((err) => {
                toast.error(err.data);
                console.log(err);
            });
    }

    return (
        <div>
            <div className="container w-25">
                <h2 className="text-center">Update Profile</h2>
                <form onSubmit={handlePlaceOrder}>
                    <label>Name</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={input.name}
                        onChange={handleChange}
                        required
                        pattern="[A-Za-z\s]*"
                        title="Only letters are allowed"
                    />
                    <label> Email</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={input.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Mobile Number</label>
                    <input
                        name="mobile"
                        type="mobile"
                        className="form-control"
                        value={input.mobile}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        minLength={10}
                        title="Only ten digits are allowed"
                    />
                    <label>Address</label>
                    <input
                        name="address"
                        type="address"
                        className="form-control"
                        value={input.address}
                        onChange={handleChange}
                        required
                    />
                    <label>City</label>
                    <input
                        name="city"
                        type="place"
                        className="form-control"
                        value={input.city}
                        onChange={handleChange}
                        required
                    />
                    <div className="text-center">
                        <button className="btn btn-primary mt-3" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}