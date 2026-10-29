import { useEffect, useSyncExternalStore } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pharmacies from "./pages/Pharmacies";
import HowItWorksPage from "./pages/HowItWorksPage";
import Profile from "./pages/Profile";

import {
  isAuthLoading,
  restoreAuthSession,
  subscribeToAuth,
} from "./services/authSession";

export default function App() {
  const authLoading = useSyncExternalStore(
    subscribeToAuth,
    isAuthLoading
  );

  useEffect(() => {
    restoreAuthSession();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f8fbfa] flex items-center justify-center">
        <p className="text-slate-600">
          Loading CarePath...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbfa]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/chat" element={<Chat />} />

        <Route path="/profile" element={<Profile />} />

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
