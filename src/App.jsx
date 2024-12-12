import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";
import { use } from "react";

function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}


function App() {
    const [showSidebar, setShowSidebar] = useState(true);
    const navigate = useNavigate();
    const [token, setToken] = useState(null);


    const checkToken = () => {
        const token = Cookies.get("bearer_token");
        axios.post("", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log("User data: ", response.data);
                
            })
            .catch((error) => {
                console.error("Error: ", error);
            });

        console.log("Token: ", token);
        return token;
    }


    // Check if user is authenticated
    useEffect(() => {
        // Update token state before running logic
        Cookies.set("bearer_token", "test_token");
        setToken(Cookies.get("bearer_token"));
        checkToken();

        const url = location.pathname;
        let regex = /^\/auth\/(login|register)$/;

        console.log('Running auth check');
        console.log("Token: ", token);

        if (!token) {
            console.log("Token not found, redirecting to login");
            navigate("/auth/login");
        } else {
            if (regex.test(url)) {
                console.log("Token found and on auth route, redirecting to home");
                navigate("/");
            } else {
                console.log("Token found and not on auth route");
            }
        }
    }, [token, navigate]);


    return (
        <section className="vlx-main-page">
            <AppContent showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </section>
    );
}

function AppContent({ showSidebar, setShowSidebar }) {
    const location = useLocation();

    // Toggle sidebar visibility based on URL
    useEffect(() => {
        const url = location.pathname;
        let regex = /^\/auth\/(login|register|logout)$/;

        setShowSidebar(!regex.test(url));
    }, [location, setShowSidebar]);

    return (
        <>
            {showSidebar && <Sidebar />}

            <section className="vlx-body">
                <Routes>
                    {/* Pages */}
                    <Route path="/" element={<Home />} />

                    {/* Authentication */}
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Routes>
            </section>
        </>
    );
}

export default AppWrapper;
