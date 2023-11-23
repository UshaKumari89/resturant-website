import React from 'react';
import Nav  from '../components/Nav'; 
import Footer from '../components/Footer';
import Card from '../components/card';
import "./Home.scss";
import Carousel from '../components/Carousal';
//images come from backend
import image1 from '../images/img_1.jpg';
import image2 from '../images/img_2.jpg'
//serach 
import Search from '../components/Search';




function Home() {

  let images = [
    image1,
    image2,
  ];
  
  return (
    <div>
      <Nav />
      <Carousel images={images} /> 
      <Search />
      <div className = "cardsContainer">
      <Card/> <Card/> <Card/> 
      </div>
  
      <Footer />
    </div>
  );
}

export default Home;
