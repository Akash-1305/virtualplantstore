import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify"
import { baseurl } from "./App";
import { useLocation } from "react-router-dom";

export default function Manageproducts() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("");
    const [productid, setProductId] = useState("");
    const [category, setCategory] = useState("");
    const { pathname } = useLocation();
    console.log(pathname)

    const [productList, setProductList] = useState([]);

    const categories = ['Flower', 'Fruit', 'Tree', 'Seeds', 'Gift'];


    useEffect(() => {
        getProducts();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.onloadend = () => {
            const dataURL = reader.result;
            setImage(dataURL);
        }
        reader.readAsDataURL(file)
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newPlant = {
            name: name,
            price: price,
            image: image,
            description: description,
            category: category,
            availability: availability,
        };
        productid ? axios.put(baseurl + `/Product/UpdateProduct/${productid}`, newPlant) : axios.post(baseurl + "/Product/AddProducts", newPlant)
            .then((res) => {
                toast.success("Product added")
                getProducts();
                ClearFilds();
            })
            .catch((err) => {
                toast.error(err.data)
                console.log(err);
            })
    }

    function getProducts() {
        axios
            .get(baseurl + `/Product/GetAllProducts`)
            .then(res => {
                setProductList(res.data);
            })
            .catch(err => {
                toast.error(err.data)
                console.log(err);
            })
    }

    function ClearFilds() {
        setName("");
        setDescription("");
        setPrice("");
        setAvailability("");
        setImage("");
        setProductId("");
        document.getElementById("image").value = null;
        setCategory("");
    }

    function deleteProduct(id) {
        axios
            .delete(baseurl + `/Product/DeleteProducts/${id}`)
            .then(res => {
                toast.success(res.data);
                getProducts();
                ClearFilds();
            })
            .catch(err => {
                toast.error(err.data)
                console.log(err);
            })
    }

    const AssignData = (product) => {
        setName(product.name);
        setPrice(product.price);
        setAvailability(product.availability);
        setDescription(product.description);
        setProductId(product.id);
        setCategory(product.category);
        window.scrollTo(0, 0);
    };


    return (
        <div>
            <div className="container">
                {pathname === "/Manageproducts" && (
                    <>
                        <h2 className="text-center">Add Product to Sell</h2>
                        <form onSubmit={handleAddProduct}>
                            <select
                                className="form-select text-center mb-3"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="" hidden>
                                    ---Select Category---
                                </option>
                                {categories.map((cat) => {
                                    return <option value={cat}>{cat}</option>;
                                })}
                            </select>
                            <label>Plant Name:</label>
                            <input
                                type="textbox"
                                className="form-control mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label>Price:</label>
                            <input
                                type="number"
                                className="form-control mb-3"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                            <label>Image:</label>
                            <input
                                type="file"
                                className="form-control mb-3"
                                id="image"
                                onChange={handleImageChange}
                                required
                            />
                            <label>Discription:</label>
                            <textarea
                                className="form-control mb-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            {(baseurl + "/Product/AddProducts") ? (
                                <button className="btn btn-primary" type="submit">{ }
                                    Add Plant
                                </button>) : (
                                <button className="btn btn-primary" type="submit">{ }
                                    Update
                                </button>
                            )}
                        </form>
                    </>
                )}
            </div>
            <div className="m-3" >
                <Row>
                    {productList.map((plant, index) => (
                        <Col key={index} md={4}>
                            <div className="card m-3" style={{ height: 700 }}>
                                <div className="card-header d-flex justify-content-center">
                                    <img src={plant.image} alt={image.name} height={300} width={300} />
                                </div>
                                <div className="overflow-auto">
                                    <div className="m-2">
                                        <h2>{plant.name}</h2>
                                        <p>
                                            <strong>Category:</strong> {plant.category}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> ₹{plant.price}
                                        </p>
                                        <p>
                                            <strong>Availability:</strong> {plant.availability}
                                        </p>
                                        <p>
                                            <strong>Description:</strong> {plant.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={() => deleteProduct(plant.id)}>
                                        Delete
                                    </button>
                                    {pathname === "/Manageproducts" && (
                                        <button className="btn btn-warning ms-3" onClick={() => AssignData(plant)}>
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );

}

