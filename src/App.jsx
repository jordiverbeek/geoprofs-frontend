import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Home from './pages/Home';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Register from "./pages/Register";
import Manager from "./pages/Manager";
import Werknemers from "./pages/Werknemers";

function App() {
    const [showSidebar, setShowSidebar] = useState(true);
    const [isloggedin, setIsloggedin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('bearer_token');
        if (!token) {
            setIsloggedin(false);
            navigate('/auth/login');
        } else {
            setIsloggedin(true);
        }
    }, [navigate]);

    return (
        <section className='vlx-main-page'>
            <AppContent
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                isloggedin={isloggedin}
            />
        </section>
    );
}

function AppContent({ showSidebar, setShowSidebar, isloggedin }) {
    const location = useLocation();

    useEffect(() => {
        const url = location.pathname;
        let regex = /^\/auth\/(login|register|logout)$/;

        if (regex.test(url)) {
            setShowSidebar(false);
        } else {
            setShowSidebar(true);
        }
    }, [location, setShowSidebar]);

    return (
        <>
            {showSidebar && <Sidebar />}
            <section className='vlx-body'>
                <Routes>


                    {/* Authentication */}
                    <Route path="/" element={isloggedin ? <Home /> : <Login />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/Manager" element={<Manager/>} />
                    <Route path="/werknemers" element={<Werknemers />} />
                </Routes>
            </section>
        </>
    );
}


function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Root;
