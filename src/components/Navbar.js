import React,{useState,useContext} from 'react';
import {
  FaHome
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing
import "./navbar.css";
import {LogContext } from '../context/LogContext';
const Navbar=() =>{

  const navigate = useNavigate()

  const [fullName, setFullName] = useState(localStorage.getItem('fullName') || '');
 const { isLoggedIn, setIsLoggedIn } = useContext(LogContext);

  const handleLogout =()=>{
    setIsLoggedIn(false);
    localStorage.clear()
    setFullName('');
    navigate("/login")
  } 
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Brain</Link>
        <Link to="/">Painter</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/"><FaHome>Home</FaHome>
            <i className="FaHome"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        </ul>
        <ul className="navbar-btns">
        {!isLoggedIn && (
        <>
        
       <button className="logout-button"><NavLink to="/login"className="logout-button white-text">Login</NavLink></button>
      
      
       <button className="logout-button"><NavLink to="/signup"className="logout-button white-text">Signup</NavLink></button>
      
      </>
        )}
         {isLoggedIn && (
          // <li>
          //    <span style={{color: "black"}}>{localStorage.getItem('fullname')}</span>
          //   <button style={{color: "white"}} className="logout-button" onClick={handleLogout}>Logout</button>
          // </li>
          <li>
          <span style={{ color: "black", textTransform: "capitalize", fontWeight: "bold" }}>
            {localStorage.getItem('fullname')}
          </span>{" "}
          <button style={{ color: "white" }} className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
        
        )}
        
      </ul>
    </nav>
  );
}

export default Navbar;
