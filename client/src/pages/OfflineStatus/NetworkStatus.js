import React, { useState, useEffect } from "react";
import { MdWifiOff } from "react-icons/md";

const NetworkStatus = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts"); 
        if (response.ok) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } catch (error) {
        setIsOnline(false);
      }
    };
  
    const handleOnline = () => {
      setIsOnline(true);
    };
  
    const handleOffline = () => {
      setIsOnline(false);
    };
  
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  
    // Perform an actual request to check online status
    checkConnection();
  
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  

  const offlineContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  };

  const iconStyle = {
    fontSize: "6rem",
    color: "#e53e3e",
  };

  const messageStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1a202c",
    marginTop: "1rem",
  };

  const subMessageStyle = {
    color: "#718096",
    marginTop: "0.5rem",
  };

  const retryButtonStyle = {
    marginTop: "1.5rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#2E718A",
    color: "#fff",
    borderRadius: "0.375rem",
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const retryButtonHoverStyle = {
    backgroundColor: "#c45516",
  };

  return (
    <div>
      {isOnline ? (
        children
      ) : (
        <div style={offlineContainerStyle}>
          <div>
            <MdWifiOff style={iconStyle} />
            <p style={messageStyle}>No Network Connection</p>
            <p style={subMessageStyle}>
              Please check your internet connection and try again.
            </p>
            <button
              style={retryButtonStyle}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  retryButtonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor =
                  retryButtonStyle.backgroundColor)
              }
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;
