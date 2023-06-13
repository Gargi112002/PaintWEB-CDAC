import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { LogProvider, LogContext } from "./context/LogContext";

const App = () => {

  const handleRouteChange = (path) => {
    if (JSON.parse(localStorage.getItem("token"))) {
      localStorage.setItem("storedPath", path);
    }
  };

  return (
    <LogProvider>
      <Router>
        <Navbar />
        <Routes onUpdate={handleRouteChange}>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route element={<ProtectedRoute element={<About />} />} />
          <Route element={<ProtectedRoute element={<Contact />} />} />
        </Routes>
        <Footer />
      </Router>
    </LogProvider>
  );
};

export default App;
