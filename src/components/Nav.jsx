import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../main/AboutUs'

import "./Nav.scss";
import Logo from "./Logo";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navigation">
   
      <Logo/>
      <div
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
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
        <li className="menuItems">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
