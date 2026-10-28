import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pharmacies from "./pages/Pharmacies";
import HowItWorksPage from "./pages/HowItWorksPage";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fbfa]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/chat" element={<Chat />} />

        <Route
          path="/how-it-works"
          element={<HowItWorksPage />}
        />

        <Route
          path="/pharmacies"
          element={<Pharmacies />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="*"
          element={
            <ComingSoon
              title="Page Not Found"
              description="The page you're looking for doesn't exist."
            />
          }
        />
      </Routes>
    </div>
  );
}
