
import React from "react";

import "./Footer.scss";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="section">
      <Logo/>
        <p>t's a space where stories are shared, laughter echoes, and moments are cherished.
          We're honored to be a part of your 
          culinary journey and look forward to welcoming you 
          into our restaurant to savor the flavors that define us.</p>
      </div>
      <div className="section">
        <h3>Opening Hours</h3>
        <ul>
          <li>Mon-thur : 9AM - 10PM</li>
          <li>Fri : 10AM - 10PM</li>
          <li>Sat : 11AM - 09PM</li>
          <li>Sun : 11AM - 09PM</li>
          
        </ul>
      </div>
      <div className="section">
        <h3>Find Us</h3>
        <p> Ringsgatan 12, 
        Kista, Stockholm</p>
        <p>Email : slice&spice@restaurant.com</p>
        <p>Phone : +123 456 789</p>
      </div>
    </footer>
  );
};

export default Footer;
