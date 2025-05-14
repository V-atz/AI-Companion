import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="h-screen flex flex-col bg-[#fdfcfb] text-[#1a1a1a]">
      {/* Header */}
      <header className="px-8 py-4 bg-[#0f0f0f] text-[#f5f5f5] shadow-md">
        <div className="text-3xl font-playfair tracking-wide font-semibold italic">
          Personae
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
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

export default AuthLayout;