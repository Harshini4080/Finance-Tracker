import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

/**
 * Register Component
 * Handles user registration, form validation, loading state,
 * and navigation on successful signup.
 */
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Submit registration form
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      message.error("Unable to register");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home if user already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {loading && <Spinner />}

      <div style={styles.wrapper}>
        {/* Inline styles for animations & responsiveness */}
        <style>{customStyles}</style>

        {/* Register Card */}
        <div style={styles.card} className="register-card">
          <h2 style={styles.title}>Create Account ✨</h2>
          <p style={styles.subtitle}>Join us by creating a new account</p>

          {/* Registration Form */}
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

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

            {/* Footer with login link and register button */}
            <div style={styles.footer}>
              <span style={styles.linkText}>
                Already registered?{" "}
                <Link to="/login" className="login-link" style={styles.registerLink}>
                  Login here
                </Link>
              </span>
              <button type="submit" style={styles.registerBtn} className="register-btn">
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

// Component styles
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
  footer: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  registerBtn: {
    padding: "10px 20px",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 500,
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

// Embedded style sheet for animation and overrides
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

  .register-card input {
    height: 42px;
    border-radius: 10px;
    padding-left: 12px;
    border: none;
    background-color: rgba(255, 255, 255, 0.6);
    color: #333;
  }

  .register-card input::placeholder {
    color: #777;
  }

  .register-card .ant-form-item-label > label {
    color: #333;
    font-weight: 500;
  }

  .register-btn {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .register-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  .login-link:hover {
    text-decoration: underline;
    color: #5f3dc4;
  }

  input:focus, .ant-input-affix-wrapper-focused {
    border-color: #2193b0 !important;
    box-shadow: 0 0 0 2px rgba(33, 147, 176, 0.2);
  }

  @media (max-width: 480px) {
    .register-card {
      padding: 24px !important;
      width: 90% !important;
    }
  }
`;

export default Register;
