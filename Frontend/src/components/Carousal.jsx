import React, { useState } from "react";
import "./Carousal.scss";

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="carousel" id="carousel">
      <div className="image-container">
        <img
          src={images[currentImageIndex]}
          alt={`Img ${currentImageIndex}`}
          className="imagebg"
        />
        <div className="controls">
          <button onClick={prevImage}>&lt;</button>
          <button onClick={nextImage}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
