import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (state.confirmPassword !== state.password) {
      alert("password and confirm password do not match");
      return;
    }
    console.log("hello world");
    // navigate('/login');

    fetch("http://localhost:3000/users/tokens/sign_up", {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
      headers: { "content-type": "application/json" },
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          navigate("/login");

          console.log(data);
        });
      } else {
        r.json().then((data) => {
  
          let errorDesc = data.error_description;
          for(let i = 0; i < errorDesc.length; i++) {
            console.log(errorDesc[i]);
            alert(errorDesc[i]);

          }
        });
      }
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="confirmpassword">Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmpassword"
          onChange={(e) => handleChange(e)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Signup;
