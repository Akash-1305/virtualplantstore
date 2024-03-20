import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Error() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function navigatelogin(e) {
        e.preventDefault();
        navigate("/Login")
    }

    return (
        <>
            {pathname === "/Admin" ? (
                <div className="error-background-admin">
                    <div className="card w-25 text-center" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        <div className="mt-2">
                            <h3>You've Been Logged Out</h3>
                            <p>Please log back in</p>
                        </div>
                        <div className="card-footer text-center" onClick={navigatelogin} style={{ cursor: 'pointer' }}>
                            <strong className="text-primary">Log In</strong>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="error-background-user">
                    <div className="card w-25 text-center" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        <div className="mt-2">
                            <h3>You've Been Logged Out</h3>
                            <p>Please log back in</p>
                        </div>
                        <div className="card-footer text-center" onClick={navigatelogin} style={{ cursor: 'pointer' }}>
                            <strong className="text-primary">Log In</strong>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}