import React from "react";
import Character from "../components/Character";

function Home() {
  return (
    <div className="max-h-screen text-[#1a1a1a] px-6 py-12">
      <h1 className="text-4xl font-playfair italic font-semibold text-center mb-6">
        Meet Your AI Companions
      </h1>
      <Character />
    </div>
  );
}

export default Home;