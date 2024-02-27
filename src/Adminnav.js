import React from "react"
import { Link, Outlet } from "react-router-dom"

export default function Adminnav() {
    return (
        <>
            <nav className="d-flex justify-content-between m-2">
                    <h2> Virtual Plant Store </h2>
                    <div>
                        <Link to={'/Manageproducts'}>Manageproducts</Link>
                    </div>
            </nav>
            <Outlet />
        </>
    )
}
