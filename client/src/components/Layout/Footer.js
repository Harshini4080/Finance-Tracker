import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#0F172A",
        padding: "16px 0",
        textAlign: "center",
        fontWeight: "500",
        fontSize: "14px",
        borderTop: "1px solid rgba(255,255,255,0.3)",
        borderTopLeftRadius: "18px",
        borderTopRightRadius: "18px",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)",
        marginTop: "40px",
      }}
    >
      © {new Date().getFullYear()} <b>Finance Tracker</b> | Built with 💙 by{" "}
      <span style={{ fontWeight: "600", color: "#60A5FA" }}>Harshini</span>
    </footer>
  );
};

export default Footer;
