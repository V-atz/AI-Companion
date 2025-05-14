import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white text-[#1a1a1a]">
      {/* Header */}
      <header className="px-8 py-4 bg-[#0f0f0f] text-[#f5f5f5] shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-playfair tracking-wide font-semibold italic">
            Personae
          </div>
          <nav className="flex gap-8 text-base font-medium">
            <Link to="/home" className="hover:text-gray-300 transition">
              Home
            </Link>
            <Link to="/allChat" className="hover:text-gray-300 transition">
              Chats
            </Link>
            <Link to="/customCharacter" className="hover:text-gray-300 transition">
              Characters
            </Link>
            <Link to="/scene" className="hover:text-gray-300 transition">
              Story Mode
            </Link>
            <Link to="/contact" className="hover:text-gray-300 transition">
              Contact
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] text-[#d4d4d4] text-center py-5 text-sm tracking-wide">
        © 2025 <span className="font-semibold">Personae</span> — A product of{" "}
        <span className="italic">Vatz Enterprises</span>
      </footer>
    </div>
  );
}

export default Layout;
