import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Accordion, Collapse, Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const OrderModal = ({ show, toggle, orderDetails }) => {

    const [cartItem, setCartItem] = useState([])
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("cash");
    const [showQRCode, setShowQRCode] = useState(false);
    const [edit, setEdit] = useState(false);

    const loggedUser = sessionStorage.getItem("User");

    const [user, setUser] = useState({})
    const navigate = useNavigate();


    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getCartByUser()
    },[cartItem])

    function getCartByUser() {
        axios
            .get(baseurl + `/Cart/getCartByUser/${loggedUser}`)
            .then((res) => {
                setCartItem(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

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

    function DeleteCart() {
        axios
            .delete(baseurl + `/Cart/DeleteCart/${loggedUser}`)
            .then((res) => {
                toast.success(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data);
            })

    }

    const [input, setInput] = useState({
        address: "",
        city: "",
        mobile: "",
    })

    useEffect(() => {
        setInput({ ...user });
    }, [user]);

    const handleChange = (e) => {
        setInput((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }

    const handlePlaceOrder = () => {
        const orderData = {
            totalPrice: orderDetails.totalPrice,
            quantity: orderDetails.totalQuantity,
            mobile: input.mobile,
            address: input.address,
            city: input.city,
            cart: cartItem,
        }
        axios.post(baseurl + `/Orders/CreateOrder/${loggedUser}`, orderData)
            .then((res) => {
                toggle();
                DeleteCart();
                navigate("/User/MyOrders");
                toast.success("Order places successfully!!")
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to place your order! Try agian later");
            })
    }

    return (
        <Modal show={show} onHide={toggle}>
            <Modal.Header closeButton>
                <Modal.Title className="text-primary">Place Order</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="my-3">
                        <Accordion.Header>
                            <span className="text-warning fs-5">Delivery Details</span>
                        </Accordion.Header>
                        <Accordion.Body className="text-capitalize">
                            <div className="d-flex w-100 justify-content-between gap-2 align-items-center mb-3">
                                <span>Name: {user.name}</span>
                                <FiEdit
                                    role="button"
                                    size={"1.2rem"}
                                    className="text-success"
                                    onClick={() => setEdit(true)}
                                />
                            </div>
                            {!edit && (
                                <div>
                                    <p>Mobile: {user.mobile}</p>
                                    <p>Address: {user.address}</p>
                                    <p>City: {user.city}</p>
                                </div>
                            )}
                            <Collapse in={edit}>
                                <div>
                                    <Form>
                                        <Form.Group className="m-2">
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control
                                                name="mobile"
                                                value={input.mobile}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="m-2">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                name="address"
                                                value={input.address}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="m-2">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                name="city"
                                                value={input.city}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Collapse>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="my-3">
                        <Accordion.Header>
                            <span className="text-warning fs-5">Payment Mode</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Form.Check
                                type="radio"
                                label="Cash on delivery"
                                checked={selectedPaymentOption === "cash"}
                                onChange={() => {
                                    setSelectedPaymentOption("cash");
                                    setShowQRCode(false);
                                }}
                            />
                            <Form.Check
                                type="radio"
                                label="UPI"
                                checked={selectedPaymentOption === "upi"}
                                onChange={() => {
                                    setSelectedPaymentOption("upi");
                                    setShowQRCode(true);
                                }}
                            />
                        </Accordion.Body>
                    </Accordion.Item>

                    {selectedPaymentOption === "upi" && (
                        <Accordion.Item eventKey="3" className="my-3">
                            <Accordion.Header>
                                <span className="text-warning fs-5">UPI Payment</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>Scan the following QR code to make a UPI payment:</p>
                                {showQRCode && (
                                    <img
                                        alt="UPI QR Code"
                                        className="ing-fluid"
                                    />
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                    <Accordion.Item eventKey="2" className="sy-3">
                        <Accordion.Header>
                            <span className="text-warning fs-5">Order Details</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>Total Quantity: {orderDetails.totalQuantity} items</p>
                            <p>Total Price: {orderDetails.totalPrice}</p>
                            <p>
                                Delivery Charge: Free Delivery("<i className="text-muted text-decoration-line-through">₹40</i>")
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggle}>
                    Close
                </Button>
                <Button variant="primary" onClick={handlePlaceOrder}>
                    Confirm Order
                </Button>
            </Modal.Footer >
        </Modal >
    );
}

export default OrderModal;