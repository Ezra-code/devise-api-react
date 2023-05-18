import React from "react";
import { useNavigate } from "react-router-dom";
const Home = ({ user, setUser, setIsLoggedIn }) => {
  const navigate = useNavigate();
  function handleLogout() {
    navigate("/login");

    localStorage.removeItem("refresh_token");
    localStorage.removeItem('user')
    setUser(null);
    setIsLoggedIn(false);
    console.log("loging out");
  }
  return (
    <div>
      <p>hello there {user} </p>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Home;
