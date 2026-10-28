import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fbfa]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

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

        <Route
          path="/login"
          element={
            <ComingSoon
              title="Welcome Back"
              description="Account login is currently under development. Guest access will remain available."
            />
          }
        />

        <Route
          path="/signup"
          element={
            <ComingSoon
              title="Join CarePath"
              description="Soon you'll be able to create an account and save your conversations."
            />
          }
        />

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
