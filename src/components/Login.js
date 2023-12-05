import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const styles = {
  loginContainerStyle: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  },

  headerStyle: {
    color: "#333",
  },

  inputStyle: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },

  buttonStyle: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },

  paragraphStyle: {
    marginTop: "10px",
    color: "#555",
  },

  linkStyle: {
    textDecoration: "underline",
    color: "#007BFF",
  },
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      navigate("/chat");
      if (response.status === 200) {
        toast.success("Successfully Logged in!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Error in Logging in.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div style={styles.loginContainerStyle}>
      <h2 style={styles.headerStyle}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.inputStyle}
      />
      <button onClick={handleLogin} style={styles.buttonStyle}>
        Login
      </button>
      <p style={styles.paragraphStyle}>
        Don't have an account?{" "}
        <Link to="/register" style={styles.linkStyle}>
          Register here.
        </Link>
      </p>
    </div>
  );
};

export default Login;
