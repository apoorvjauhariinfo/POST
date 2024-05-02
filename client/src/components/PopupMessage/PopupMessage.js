import React, { useState, useEffect } from "react";
import "./PopupMessage.css";

const PopupMessage = ({ message, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return isVisible ? (
    <div className="popup-message">
      <span>{message}</span>
    </div>
  ) : null;
};

export default PopupMessage;
