import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'

function App() {
    const [count, setCount] = useState(0)

    return (
        <section className='vlx-main-page'>
            <BrowserRouter>
                <Sidebar />
                <section className='vlx-body'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </section>
            </BrowserRouter>
        </section>
    )
}

export default App
