import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa"
import axios from "axios";
import { baseurl } from "../App";
import { toast } from "react-toastify";

export default function Manageorders() {
    const [orders, setOrders] = useState([]);
    const [singleOrder, setSingleOrder] = useState({})
    const [show, setShow] = useState(false)

    const toggle = (order) => {
        setShow(!show)
        setSingleOrder(order)
    }

    const loadAllOrders = () => {
        axios
            .get(baseurl + `/Orders/GetAllOrders`)
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadAllOrders();
    }, [orders]);

    const updateOrder = (id, status) => {
        const data = {
            status: status,
        };
        axios.put(baseurl + `/Orders/UpdateStatus/${id}`, data)
            .then((res) => {
                toast.success(res.data);
                loadAllOrders();
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    }

    return (
        <Container>
            <h2 className="text-center my=3 text-primary">Manage Orders</h2>
            <Table striped bordered hover>
                <thead className="text-center">
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="fw-semibold align-middle"><Link onClick={() => toggle(order)}>{order.id}</Link>

                            </td>
                            <td className="align-middle text-capitalize">
                                {order?.user.name}
                            </td>
                            <td>
                                {order.product.map((item, index) => (
                                    <p key={index}>{item.name}</p>
                                ))}
                            </td>
                            <td className="align-middle">{order.totalPrice}</td>
                            <td
                                className={`align-middle ${order.status === "cancelled" ? "text-danger" : ""}`}
                            >
                                {order.status}
                            </td>
                            <td className="align-middle">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <FaStar
                                        key={rating}
                                        size={24}
                                        className={
                                            rating <= (order.rating || 0)
                                                ? "text-warning"
                                                : "text-secondary"
                                        }
                                        style={{ cursor: "pointer" }}
                                    />
                                ))}
                            </td>
                            <td className="align-middle">
                                {order.status === "Placed" && (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => updateOrder(order.id, "Dispatched")}
                                    >
                                        Dispatch
                                    </Button>
                                )}
                                {order.status === "Dispatched" && (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => updateOrder(order.id, "Delivered")}
                                    >
                                        Delivered
                                    </Button>
                                )}
                                {(order.status === "Placed" ||
                                    order.status === "Dispatched") && (
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="ms-2"
                                            onClick={() => updateOrder(order.id, "Cancelled")}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                {order.status === "Return requested" && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="ns-2"
                                        onClick={() => updateOrder(order.id, "Refunded")}
                                    >
                                        Refund
                                    </Button>
                                )}
                                {order.status === "Return requested" && (
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => updateOrder(order.id, "Request cancelled")}
                                >
                                    Cancel Request
                                </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </Container >
    )
}