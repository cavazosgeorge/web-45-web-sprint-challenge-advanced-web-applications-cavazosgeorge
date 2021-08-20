import React from "react";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const { push } = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    push("/");
  };

  return (
    <button data-testid="logoutButton" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
