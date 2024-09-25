import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'

function App() {
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        const url = window.location.pathname;
        let regex = /^\/auth\/(login|register|logout)$/;
    
        if (regex.test(url)) {
          setShowSidebar(false);
        } else {
          setShowSidebar(true);
        }
      }, [location]);
    
    

    return (
        <section className='vlx-main-page'>
            <BrowserRouter>
                {
                    showSidebar ? <Sidebar /> : null
                }

                <section className='vlx-body'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth/login" element={<Login />} />
                    </Routes>
                </section>
            </BrowserRouter>
        </section>
    )
}

export default App
