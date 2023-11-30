
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Nav.scss';
import Logo from "./Logo";
import CartBadge from './CartBadge'; 
// import Modal from "../Modal";

function Nav() {
  // const [cartView, setCartView] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("autToken"); 
    if (authToken) { 
      setIsLoggedIn(true);
    } else { 
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("autToken"); 
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navigation">
      <Logo />
      <div className={`menu-toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="hamburger-icon">&#9776;</div>
        <div className="close-icon">&times;</div>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li className="menuItems">
          <Link to="/">Home</Link>
        </li>
        <li className="menuItems">
          <Link to="/aboutus">About Us</Link>
        </li>
        {isLoggedIn ? (
          <li className=" navbuttonsContainer ">
            <Link to="/orderHistory" className="menuItems">History</Link>
       
            <button className="navbutton">
            <Link to="/" className="menuItems">Cart<CartBadge count={2} /></Link>
            </button>
            {/* {cartView ? <Modal ></Modal>:null} */}
            <button onClick={handleLogout} className="navbutton">
            <Link to="/login" className="menuItems">Logout</Link>
            </button>
                   
          </li>
        ) : (
          <li className="menuItems">
            <Link to="/login" className="navbutton">Login</Link>
            <Link to="/createuser" className="navbutton">SignUp</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
