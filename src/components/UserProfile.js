import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    borderBottom: "2px solid #ddd",
    paddingBottom: "8px",
    color: "#333",
  },
  text: {
    fontSize: "16px",
    marginBottom: "8px",
    color: "#555",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#e8313a",
    color: "white",
    padding: "10px 15px",
    margin: "8px 10px auto 0px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    outline: "none",
  },
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [clearChatHistoryLoading, setClearChatHistoryLoading] = useState(false);
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);

  const handleClearChatHistory = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      setClearChatHistoryLoading(true);

      const response = await api.post(
        "/auth/clear-chat-history",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Chat history cleared successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error("Error clearing chat history. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setClearChatHistoryLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      setDeleteUserLoading(true);
      const response = await api.delete(`/auth/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/register");
        toast.success("User deleted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.success("Failed to delete User.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setDeleteUserLoading(false);
    }
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log(userId);
        const response = await api.get(`/auth/user-profile?userId=${userId}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.heading}>User Info</div>
      <p style={styles.text}>Username: {userData.username}</p>
      <p style={styles.text}>First Name: {userData.firstname}</p>
      <p style={styles.text}>Last Name: {userData.lastname}</p>
      <button
        style={styles.button}
        onClick={handleClearChatHistory}
        disabled={clearChatHistoryLoading}>
        {clearChatHistoryLoading
          ? "Clearing Chat History..."
          : "Clear Chat History"}
      </button>
      <button
        style={styles.button}
        onClick={handleDeleteUser}
        disabled={deleteUserLoading}>
        {deleteUserLoading ? "Deleting User..." : "Delete User"}
      </button>
    </div>
  );
};

export default UserProfile;
