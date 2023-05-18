import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/users/tokens/sign_in", {
      method: "POST",
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          navigate("/");
          let user = data.resource_owner.email;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem(
            "refresh_token",
            JSON.stringify(data.refresh_token)
          );
          setUser(user);
          console.log(user);
          setIsLoggedIn(true);
          console.log(data.refresh_token);
        });
      } else {
        r.json().then((data) => {
          let errorDesc = data.error_description;
          for (let i = 0; i < errorDesc.length; i++) {
            console.log(errorDesc[i]);
            alert(errorDesc[i]);
          }
        });
      }
    });
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
