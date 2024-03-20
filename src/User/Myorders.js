import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../App";

export default function Myorders(){
    const [orders, setOrders] = useState([])

    const loggedUser = sessionStorage.getItem("User");

    useEffect(() => {
        getMyOrders();
    },[])
    function getMyOrders() {
        axios
            .get(baseurl + `/Orders/GetAllOrdersByUser/${loggedUser}`)
            .then((res) => {
                console.log(res.data)
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    return(
        <><h2>My Orders</h2></>
    )
}