import { useState } from "react";
import { Login, Signup, Home } from "./components";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)
  let userData = localStorage.getItem('refresh_token');

  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    if(userData){
      // user = JSON.parse(user);
      return true;
    }else{
      return false;
    }
  });
  const [user, setUser] = useState(()=>{
    if(userData){
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      return user;
    }else{
      return null;
    }
  });

  return (
    <>
      <Navbar  isLoggedIn={isLoggedIn}/>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
      
      </Routes>
    </>
  );
}

export default App;
