import React, { useState } from "react";
import "./Card.scss";
import Button from "./Button";

const Card = () => {
  const [size, setSize] = useState("medium"); // Default size

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  // Replace these placeholder values with your actual data
  const title = "Product Title";
  const imageUrl = "https://placekitten.com/200/300"; // Replace with your image URL
  const description = "Product description goes here";
  const price = 10; // Replace with your actual price

  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <p>{description}</p>

      <div className="options">
          <p>Price: ${price}</p>
        <select id="size" value={size} onChange={handleSizeChange}>
       
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select id="quantity">
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {" "}
                {i + 1}{" "}
              </option>
            );
          })}
        </select>
      <Button/> 
      </div>
    </div>
  );
};

export default Card;
