import React, { useState } from "react";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = () => {
    // Implement user login logic using local storage

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      navigate("/todo");

      toast.success('User LoggedIn Successfully !!!', {
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
      
      toast.error('Incorrect username or password. Please try again.', {
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
      <ToastContainer/>

      <form className="login-form">

        <h2 style={{textAlign:"center",color:"red"}}>Login</h2>

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
        
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>

        <p>Don't have an account? <Link to={"/signup"}>Create</Link></p>
      </form>
      
    </div>

    
  );
};

export default Login;