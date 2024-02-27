import React from "react"
import { Link, Outlet } from "react-router-dom"

export default function Header() {
    return (
        <>
            <nav className="d-flex justify-content-between m-2">
                    <h2> Virtual Plant Store </h2>
                    <div>
                        <Link to={'/Home'}>Home</Link>
                        <Link to={'/Login'}>Login</Link>
                    </div>
            </nav>
            <Outlet />
        </>
    )
}
