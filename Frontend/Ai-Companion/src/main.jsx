import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import AuthLayout from "./AuthLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import CustomCharacter from "./components/CustomCharacter.jsx";
import AllChat from "./pages/AllChat.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CharacterDetails from "./components/CharacterDetails.jsx";
import Scene from "./pages/Scene.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<App />} />
          <Route path="contact" element={<Contact />} />
          <Route path="home" element={<Home />} />
          <Route path="allChat" element={<AllChat />} />
          <Route path="chat/:id" element={<ChatPage />}/>
          <Route path="home/characterDetails/:id" element={<CharacterDetails/>}/>
          <Route path="customCharacter" element={<CustomCharacter />} />
          <Route path="scene" element={<Scene />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);