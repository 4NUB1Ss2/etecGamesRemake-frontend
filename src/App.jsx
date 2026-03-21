import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Profile from './pages/Profile'





function App() {


    return (
        <>
            <Navbar />ve

            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="*" element={<NotFound />} />



            </Routes>

            <Footer />
        </>
    )
}

export default App