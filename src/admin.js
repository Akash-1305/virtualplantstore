import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
    return (
        <>
            <h2> Admin </h2>
            <Link to={'/manageproducts'}>Manageproducts</Link>
        </>
    );
}