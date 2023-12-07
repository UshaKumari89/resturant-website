import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import "./Logo.scss";

export default function Logo() {
  return (
    <div>
      <div className="logo">
        <FontAwesomeIcon icon={faUtensils} className="logoIcon" />
        <Link to="/" className="logoText">
          Slice&Spice
        </Link>
      </div>
    </div>
  );
}
