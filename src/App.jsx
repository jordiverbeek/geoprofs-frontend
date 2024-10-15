import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Register from "./pages/Register";

function App() {
    const [showSidebar, setShowSidebar] = useState(true);
    const [isloggedin, setIsloggedin] = useState(false);

    return (
        <section className='vlx-main-page'>
            <BrowserRouter>
                <AppContent 
                    showSidebar={showSidebar} 
                    setShowSidebar={setShowSidebar} 
                    isloggedin={isloggedin} 
                />
            </BrowserRouter>
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
                    {isloggedin ? '' : <Route path="/auth/login" element={<Login />} />}
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Routes>
            </section>
        </>
    );
}

export default App;
