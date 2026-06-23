import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VerificationBanner from "./components/VerificationBanner";
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
import AdminApprovals from "./pages/AdminApprovals";
import Verify from "./pages/Verify";
import ProfessorApprovals from "./pages/ProfessorApprovals";
import { useAuth } from "./contexts/AuthContext";

function AdminGuard({ children }) {
  const { isLoggedIn, isAdmin } = useAuth()
  if (!isLoggedIn || !isAdmin) return <Navigate to="/" />
  return children
}

function App() {
  return (
    <>
      <Analytics />
      <Navbar />
      <VerificationBanner />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/professor/approvals" element={<ProfessorApprovals />} />
          
          <Route path="/games" element={<Games />} />
          <Route path="/games/new" element={<AddGame />} />
          <Route path="/games/:slug" element={<ViewGame />} />
          
          <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>} >
            <Route index element={<Navigate to="/admin/users" />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="games" element={<AdminGames />} />
            <Route path="schools" element={<AdminSchools />} />
            <Route path="approvals" element={<AdminApprovals />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
