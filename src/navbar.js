import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <h2>Hello</h2>
            <Link to='/home'>Home</Link>
            <Link to='/login'>Login</Link>
        </nav>
    );
}