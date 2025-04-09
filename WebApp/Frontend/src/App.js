import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/HomeComponents/navbar/Navbar";
import Hero from "./components/HomeComponents/Hero/Hero";
import About from "./components/HomeComponents/About";
import Pricing from "./components/HomeComponents/Pricing";
import Setup from "./components/HomeComponents/Setup";
import ContactForm from "./components/HomeComponents/contact/contact";
import "./index.css";
import Home from "./pages/Home/Home";
import EmailVerified from "./pages/EmailVerified";
import Managemap from "./pages/Managemap";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/Login/LoginPage";
import FPPage from "./pages/auth/ForgotPassowrd/FPPage";
import OtpPage from "./pages/auth/ForgotPassowrd/OtpPage";
import CPPage from "./pages/auth/ForgotPassowrd/CPPage";
import PointAddingWeb from "./components/PointAddingWeb/PointAddingWeb";
import Admin from "./pages/Admin/AdminDashboard";
import { jwtDecode } from "jwt-decode";
import ResizeMap from "./components/ResizeMap/ResizeMap";

const checkTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token: ", error);
    return true;
  }
};

const UserRouteGuard = ({ children }) => {
  const token = localStorage.getItem("UserToken");
  const AdminToken = localStorage.getItem("AdminToken");

  React.useEffect(() => {
    if (checkTokenExpired(token)) {
      localStorage.removeItem("UserToken");
    }
    if (checkTokenExpired(AdminToken)) {
      localStorage.removeItem("AdminToken");
    }
  }, [token, AdminToken]);

  if (!token && !AdminToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRouteGuard = ({ children }) => {
  const AdminToken = localStorage.getItem("AdminToken");
  const UserToken = localStorage.getItem("UserToken");

  React.useEffect(() => {
    if (checkTokenExpired(AdminToken)) {
      localStorage.removeItem("AdminToken");
    }
    if (checkTokenExpired(UserToken)) {
      localStorage.removeItem("UserToken");
    }
  }, [AdminToken, UserToken]);

  if (!AdminToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthRouteGuard = ({ children }) => {
  const token = localStorage.getItem("UserToken");
  const AdminToken = localStorage.getItem("AdminToken");
  if (token) {
    return <Navigate to="/home" />;
  } else if (AdminToken) {
    return <Navigate to="/admin" />;
  } else {
    return children;
  }
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <AuthRouteGuard>
              <div className="main-container">
                <div className="page-container">
                  <RegisterPage />
                </div>
                <div className="auth-layout">
                  <AuthLayout />
                </div>
              </div>
            </AuthRouteGuard>
          }
        />

        <Route
          path="/login"
          element={
            <AuthRouteGuard>
              <div className="main-container">
                <div className="page-container">
                  <LoginPage />
                </div>
                <div className="auth-layout">
                  <AuthLayout />
                </div>
              </div>
            </AuthRouteGuard>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <AuthRouteGuard>
              <div className="main-container">
                <div className="page-container">
                  <FPPage />
                </div>
                <div className="auth-layout">
                  <AuthLayout />
                </div>
              </div>
            </AuthRouteGuard>
          }
        />

        <Route
          path="/enter-otp/:email"
          element={
            <div className="main-container">
              <div className="page-container">
                <OtpPage />
              </div>
              <div className="auth-layout">
                <AuthLayout />
              </div>
            </div>
          }
        />

        <Route
          path="/change-password/:email"
          element={
            <div className="main-container">
              <div className="page-container">
                <CPPage />
              </div>
              <div className="auth-layout">
                <AuthLayout />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminRouteGuard>
              <Admin />
            </AdminRouteGuard>
          }
        />
        
        {/* Route for the main content */}
        <Route path="/" element={<MainContent />} />

        <Route
          path="/Home"
          element={
            <UserRouteGuard>
              <Home />
            </UserRouteGuard>
          }
        />
        <Route path="/emailVerification" element={<EmailVerified />} />
        <Route path="/managemap/:templateId" element={<Managemap />} />
        <Route path="/resizemap" element={<ResizeMap />} />
        <Route path="/pointAddingWeb" element={<PointAddingWeb />} />
      </Routes>
    </Router>
  );
}

// MainContent component
const MainContent = () => (
  <>
    {/* <Managemap/> */}
    <Navbar />
    <div className="container">
      <Hero />
      <About />
      <Setup />
      <Pricing />
    </div>
    <div className="ContactContainer">
      <ContactForm />
    </div>
  </>
);
