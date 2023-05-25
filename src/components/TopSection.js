import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/topsection.css";
export default function TopSection() {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleClick = (path) => {
        history.push(`${path}`);
    };
    const handleLogout = () => {
        logout();
        history.push("/login");
    }

    return (
        <div className="container-top">
            <div className="app-name">
                <span>Boardmania</span>
            </div>
            <div className="links-container">
                {currentUser && (
                    <div className="div-link" onClick={() => { handleClick("/my-events") }}> My Events </div>
                )
                }
                {currentUser && (
                    <div className="div-link" onClick={() => { handleClick("/dashboard") }}> All Events </div>
                )
                }
                {currentUser && (
                    <div className="div-link" onClick={() => { handleClick("/games") }}> Show Games </div>
                )
                }
                {currentUser && (
                    <div className="div-link" onClick={() => { handleLogout() }}> Logout </div>
                )
                }
                {!currentUser && (
                    <div className="div-link" onClick={() => { handleClick("/login") }}> Login </div>
                )}
                {!currentUser && (
                    <div className="div-link" onClick={() => { handleClick("/register") }}> Register </div>
                )}
            </div>
        </div>
    );
}