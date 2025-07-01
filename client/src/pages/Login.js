import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

/**
 * Login Component
 * Handles user login with form validation, loading feedback, and navigation.
 */
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      message.success("Login successful");

      // Store user info without password
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (error) {
      message.error("Unable to login");
    } finally {
      setLoading(false);
    }
  };

  // Auto-redirect if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {loading && <Spinner />}

      <div style={styles.wrapper}>
        {/* Inline CSS styles + animations */}
        <style>{customStyles}</style>

        <div style={styles.card} className="login-card">
          <h2 style={styles.title}>Welcome Back 👋</h2>
          <p style={styles.subtitle}>Login to your account</p>

          {/* Login Form */}
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {/* Footer actions */}
            <div style={styles.footer}>
              <span style={styles.linkText}>
                Not a user?{" "}
                <Link to="/register" className="register-link" style={styles.registerLink}>
                  Register here
                </Link>
              </span>
              <button type="submit" style={styles.loginBtn} className="login-btn">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

// Inline CSS styles for layout and responsiveness
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "10px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    animation: "fadeInDrop 0.8s ease-out",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#2b2b2b",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "14px",
    color: "#555",
  },
  loginBtn: {
    padding: "10px 20px",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 500,
  },
  footer: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  registerLink: {
    color: "#222",
    fontWeight: 500,
    marginLeft: "4px",
  },
  linkText: {
    fontSize: "0.9rem",
    color: "#444",
  },
};

// Embedded CSS animations and overrides
const customStyles = `
  @keyframes fadeInDrop {
    0% {
      opacity: 0;
      transform: translateY(-20px) scale(0.98);
      filter: blur(4px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  .login-card input {
    height: 42px;
    border-radius: 10px;
    padding-left: 12px;
    border: none;
    background-color: rgba(255, 255, 255, 0.6);
    color: #333;
  }

  .login-card input::placeholder {
    color: #777;
  }

  .login-card .ant-form-item-label > label {
    color: #333;
    font-weight: 500;
  }

  .login-btn {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .login-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  .register-link:hover {
    text-decoration: underline;
    color: #5f3dc4;
  }

  input:focus, .ant-input-affix-wrapper-focused {
    border-color: #a678e2 !important;
    box-shadow: 0 0 0 2px rgba(166, 120, 226, 0.2);
  }

  @media (max-width: 480px) {
    .login-card {
      padding: 24px !important;
      width: 90% !important;
    }
  }
`;

export default Login;
