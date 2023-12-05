import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const styles = {
  registerContainerStyle: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  },

  headerStyle: {
    color: "#333",
  },
  labelStyle: {
    fontSize: "1rem",
    marginBottom: "5px",
    color: "#333",
  },

  inputStyle: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },

  buttonStyle: {
    backgroundColor: "#007BFF",
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
    color: "#4CAF50",
  },
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
        firstname,
        lastname,
      });
      if (response.status === 200) {
        toast.success("User registered successfully! Log in now.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      navigate("/login");
    } catch (error) {
      if (error.response.data.message.includes("username already exists.")) {
        toast.error(
          "User already exist! Try log in or register with unique username.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    }
  };

  return (
    <div style={styles.registerContainerStyle}>
      <h2 style={styles.headerStyle}>Register</h2>
      <h5 style={styles.labelStyle}>Username:</h5>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.inputStyle}
      />
      <h5 style={styles.labelStyle}>Password:</h5>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.inputStyle}
      />
      <h5 style={styles.labelStyle}>First Name:</h5>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        style={styles.inputStyle}
      />
      <h5 style={styles.labelStyle}>Last Name:</h5>
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        style={styles.inputStyle}
      />
      <button onClick={handleRegister} style={styles.buttonStyle}>
        Register
      </button>
      <p style={styles.paragraphStyle}>
        Already have an account?{" "}
        <Link to="/login" style={styles.linkStyle}>
          Login here
        </Link>
        .
      </p>
    </div>
  );
};

export default Register;
