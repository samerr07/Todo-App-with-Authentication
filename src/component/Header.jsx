import React, { useState } from 'react';
import './header.css'; 
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Implement logout logic

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");

    toast.success('User LoggedOut Successfully !!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

  return (
    <div className="header">
      <div className="logo" >Todo App </div>

      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <button className='btm'  onClick={handleLogout} style={{color:"red"}}>
        Logout
        </button>

        <button className='btm'  >
        <Link style={{color:"red"}} to="/signup">Register</Link> 
        </button>
      </div>
    </div>
  );
};

export default Header;