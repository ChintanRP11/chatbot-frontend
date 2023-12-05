import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  headerStyle: {
    backgroundColor: "#333",
    padding: "15px",
    color: "#fff",
  },

  navLinkListStyle: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  navLinkStyle: {
    display: "inline-block",
    margin: "0 10px",
  },

  navBarStyle: {
    display: "flex",
    margin: "0 10px",
  },

  linkStyle: {
    textDecoration: "none",
    color: "#fff",
  },

  buttonStyle: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    margin: "auto 0 auto auto",
  },
};

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      const response = await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
      if (response.status === 200) {
        toast.success("Successfully logged out!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Error in Loggin out.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div style={styles.headerStyle}>
      {localStorage.getItem("token") === null ? (
        <ul className="nav-link-list" style={styles.navLinkListStyle}>
          <li style={styles.navLinkStyle}>
            <Link to="/login" style={styles.linkStyle}>
              Login
            </Link>
          </li>
          <li style={styles.navLinkStyle}>
            <Link to="/register" style={styles.linkStyle}>
              Register
            </Link>
          </li>
        </ul>
      ) : (
        <div style={styles.navBarStyle}>
          <ul className="nav-link-list" style={styles.navLinkListStyle}>
            <li style={styles.navLinkStyle}>
              <Link to="/user-profile" style={styles.linkStyle}>
                User
              </Link>
            </li>
            <li style={styles.navLinkStyle}>
              <Link to="/chat" style={styles.linkStyle}>
                Chats
              </Link>
            </li>
          </ul>
          <button onClick={handleLogout} style={styles.buttonStyle}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
