import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'

export default function Manageproducts() {
    
    const [category, setCategory] = useState("");
    const [plantname, setPlantname] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [discription, setDiscription] = useState("");

    const categories = ['Flower', 'Fruit', 'Tree', 'Seeds', 'Gift'];

    function handleSubmit(e) {
        
    }

    return (
        <div>
            <div className="card p-3">
                <h2 className="text-center">Add Product to Sell</h2>
                <form onSubmit={handleSubmit}>
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
                            return <option value ={cat}>{cat}</option>;
                        })}
                    </select>
                    <label>Plant Name:</label>
                    <input
                        type="textbox"
                        className="form-control mb-3"
                        value={plantname}
                        onChange={(e) => setPlantname(e.target.value)}
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
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                    <label>Discription:</label>
                    <textarea
                        className="form-control mb-3"
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                        required
                    />
                    <button to="/" className="btn btn-primary" type="submit">
                        Add Plant
                    </button>
                </form>
            </div>
        </div>
    );

}

