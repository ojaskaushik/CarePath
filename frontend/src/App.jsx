import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fbfa]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/chat" element={<Chat />} />

        <Route
          path="/how-it-works"
          element={
            <ComingSoon
              title="How CarePath Works"
              description="We're building a simple way to explore health information and understand your next steps."
            />
          }
        />

        <Route
          path="/pharmacies"
          element={
            <ComingSoon
              title="Find Pharmacies"
              description="Our Canadian pharmacy discovery experience is coming soon."
            />
          }
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
