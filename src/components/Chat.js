import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const styles = {
  chatContainerStyle: {
    maxWidth: "500px",
    margin: "20px auto auto auto",
    padding: "20px auto 15px auto",
    borderRadius: "5px",
  },

  botTitleStyle: {
    fontSize: "25px",
    color: "#005252",
    margin: "5px",
    textAlign: "center",
  },

  messageContainerStyle: {
    width: "80%",
    margin: "auto",
    padding: "15px",
    display: "flex",
    overflowY: "scroll",
    maxHeight: "500px",
    flexDirection: "column",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "#c9c9c9",
  },

  messageStyle: {
    wordWrap: "break-word",
    marginBottom: "10px",
    padding: "12px",
    borderRadius: "15px",
  },

  emptyBoxStyle: {
    textAlign: "center",
    height: "200px",
  },

  userMessageStyle: {
    maxWidth: "75%",
    margin: "2px 0 0 auto",
    textAlign: "right",
    background: "#192D2D",
    color: "#fff",
    fontSize: "15px",
  },

  botMessageStyle: {
    maxWidth: "75%",
    margin: "2px auto 0 0",
    textAlign: "left",
    background: "#005252",
    color: "#fff",
    fontSize: "15px",
  },

  timestampStyle: {
    margin: "2px 0 0 0",
    fontSize: "0.5em",
    color: "#b5b5b5",
  },

  inputContainerStyle: {
    width: "80%",
    marginTop: "10px",
    display: "flex",
    margin: "10px auto",
  },

  inputStyle: {
    flex: "1",
    padding: "8px",
    borderRadius: "5px",
  },

  buttonStyle: {
    marginLeft: "10px",
    padding: "8px",
    border: "0px",
    borderRadius: "5px",
    background: "#005252",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
  },
};

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const response = await api.get(`/auth/chat/history?userId=${userId}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setChatHistory(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error.message);
      }
    };

    fetchChatHistory();
  }, [message]);

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await api.post(
        "/auth/chat/send",
        { message, userId },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("");
      if (response.status === 201) {
        toast.success("Message sent!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      } else {
        toast.error("Error in sending message.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div style={styles.chatContainerStyle}>
      <h2 style={styles.botTitleStyle}>Chat with Bot</h2>
      <div style={styles.messageContainerStyle}>
        {chatHistory.length === 0 ? (
          <div style={styles.emptyBoxStyle}>Start chatting with bot...</div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              style={{
                ...styles.messageStyle,
                ...(chat.sent
                  ? styles.userMessageStyle
                  : styles.botMessageStyle),
              }}>
              <div>{chat.message}</div>
              <div style={styles.timestampStyle}>
                {formatTimestamp(chat.timestamp)}
              </div>
            </div>
          ))
        )}
      </div>
      <div style={styles.inputContainerStyle}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.inputStyle}
        />
        <button onClick={handleSendMessage} style={styles.buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
