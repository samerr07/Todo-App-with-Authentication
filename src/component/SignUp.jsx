import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSignUp = () => {
    // Implement user registration logic using local storage

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.username === username);
    
    //If same user registered alredy
    if (userExists) {
      
      toast.warning('Username already exists. Please choose a different one.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {

      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      navigate("/login");
      toast.success('User Registered Successfully !!!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  return (
    <div className="login-container">

      <form className="login-form">
        <h2 style={{textAlign:"center",color:"red"}}>Sign Up</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="button" onClick={handleSignUp} className="login-button">
        Sign Up
        </button>

        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
      </form>
      
    </div>
  );
};

export default SignUp;