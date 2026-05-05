import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Game from "./pages/Games";
import AddGame from "./pages/AddGame";
import ViewGame from "./pages/ViewGame";
import { Analytics } from "@vercel/analytics/react";
import Games from "./pages/Games";
import AdminLayout from "./pages/AdminLayout"
import AdminUsers from "./pages/AdminUsers"
import AdminGames from "./pages/AdminGames"
import AdminSchools from "./pages/AdminSchools"

function App() {
  return (
    <>
      <Analytics />
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/new" element={<AddGame />} />
          <Route path="/games/:slug" element={<ViewGame />} />
          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<Navigate to="/admin/users" />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="games" element={<AdminGames />} />
            <Route path="schools" element={<AdminSchools />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
