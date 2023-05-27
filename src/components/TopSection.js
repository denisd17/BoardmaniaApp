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
        <div className="container-top flex-row-center">
            <div className="app-logo">
                <img src={require('../resources/Logo.png')} alt="test"></img>
            </div>
            {currentUser && (
            <div className="logged-in-menu flex-row-center">
                <div className="main-menu flex-row-center"> 
                    <div className="div-link" onClick={() => { handleClick("/my-events") }}> Create Event </div>
                    <div className="div-link" onClick={() => { handleClick("/my-events") }}> My Events </div>
                    <div className="div-link" onClick={() => { handleClick("/dashboard") }}> All Events </div>
                    <div className="div-link" onClick={() => { handleClick("/games") }}> Show Games </div>
                </div>

                <div className="side-menu flex-row-center">
                    <div className="div-link side-button" onClick={() => { handleLogout() }}>
                        <img className="side-img" src={require('../resources/user.png')} alt="test"></img>
                    </div>
                    <div className="div-link side-button" onClick={() => { handleLogout() }}>
                        <img className="side-img" src={require('../resources/sign-out-alt.png')} alt="test"></img>
                    </div>
                </div>
            </div>
            )
            }
            {!currentUser && (
            <div className="logged-out-menu">
                    <div className="div-link" onClick={() => { handleClick("/login") }}> Login </div>
                    <div className="div-link" onClick={() => { handleClick("/register") }}> Register </div>   
            </div>
            )
            }
        </div>
    );
}