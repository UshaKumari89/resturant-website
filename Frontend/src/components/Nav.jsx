import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.scss";
import Logo from "./Logo";
import Modal from "../Modal";
import Cart from "../main/Cart";
import { useCart } from "./ContextReducer";
import CartBadge from "./CartBadge";

function Nav() {
  const [cartView, setCartView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();

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
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCart = () => {
    setCartView(true);
  };
  return (
    <nav className="navigation">
      <Logo />
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
        {isLoggedIn ? (
          <li className=" navbuttonsContainer ">
            <Link to="/myOrder" className="menuItems">
              My Order
            </Link>
            <button className="navbutton" onClick={handleCart}>
              Cart{" "}
              < CartBadge count={cart && cart.items ? cart.items.length : 0} />
            </button>

            {cartView ? (
              <Modal onClose={() => setCartView(false)}>
                <Cart />
              </Modal>
            ) : null}
            <button onClick={handleLogout} className="navbutton">
              <Link to="/login" className="menuItems">
                Logout
              </Link>
            </button>
          </li>
        ) : (
          <li className="menuItems">
            <Link to="/login" className="navbutton">
              Login
            </Link>
            <Link to="/createuser" className="navbutton">
              SignUp
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
