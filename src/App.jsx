import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Profile from './pages/Profile'
import {Analytics} from "@vercel/analytics/react";





function App() {


    return (
        <>
            <Analytics/>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="*" element={<NotFound />} />



            </Routes>

            <Footer />
        </>
    )
}

export default App