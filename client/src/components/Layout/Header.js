import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useTheme } from '../../context/ThemeContext';




const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
 const { darkMode,setDarkMode } = useTheme();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setLoginUser(user);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <header
      style={{
        background: darkMode
          ? "rgba(30, 41, 59, 0.6)"
          : "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: darkMode
          ? "1px solid #334155"
          : "1px solid rgba(255,255,255,0.3)",
        padding: "14px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: darkMode ? "#f1f5f9" : "#0F172A",
        borderBottomLeftRadius: "18px",
        borderBottomRightRadius: "18px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: darkMode ? "#60A5FA" : "#60A5FA",
          fontSize: "24px",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span role="img" aria-label="logo">💸</span> Finance Tracker
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? "#fff" : "#4B5563",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <span style={{ fontWeight: "500", color: darkMode ? "#f1f5f9" : "#1e293b" }}>
          👤 {loginUser?.name}
        </span>

        <button
          onClick={logoutHandler}
          style={{
            background: "#F87171",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(248, 113, 113, 0.4)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
