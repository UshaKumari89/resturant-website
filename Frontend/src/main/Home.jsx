
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import "./Home.scss";
import Carousel from "../components/Carousal";
import image1 from "../images/img_1.jpg";
import image2 from "../images/img_2.jpg";
import image3 from "../images/img3.jpeg";
import image4 from "../images/img.webp";

import Search from "../components/Search";
import Card from '../components/Card';



function Home() {
  let images = [image1, image2, image3, image4];

  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Main Course");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');


  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5500/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      setFoodItem(responseData.foodItems || []);
      setFoodCategory(responseData.foodCategory || []);
    } catch (error) {
      console.error(error);
      // Handle error state or logging here
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "Menu" : category);
    setSearchInput(''); // Clear search input when category is clicked
  };

  const handleShowWholeMenu = () => {
    setSelectedCategory("Menu");
    setSearchInput(''); // Clear search input when showing whole menu
  };

  const handleSearch = (query) => {
    setSearchInput(query);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filter items by name when searchInput or foodItem changes
    const filteredResults = foodItem.filter(item =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredItems(filteredResults);
  }, [searchInput, foodItem]);

  const filteredItemsByCategory = selectedCategory === 'Menu'
    ? filteredItems.length > 0 ? filteredItems : foodItem
    : filteredItems.filter(item => item.CategoryName === selectedCategory);

  return (
    <>
      <Nav />
      <Carousel images={images} className = 'img'/>
      <Search foodItems={foodItem}  onSearch={handleSearch} />
      <div className="categories">
        <div onClick={handleShowWholeMenu}>Menu</div>
        {foodCategory.map((category) => (
          <div
            key={category._id}
            onClick={() => handleCategoryClick(category.CategoryName)}
            className={
              selectedCategory === category.CategoryName
                ? "selectedCategory"
                : ""
            }
          >
            {category.CategoryName}
          </div>
        ))}
      </div>

  
      <div className="itemsByCategory">
         {filteredItemsByCategory.map(filteredItem => (
          <div key={filteredItem._id}>
              <Card foodItem={filteredItem} options={filteredItem.options[0]} />
      
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}


export default Home;
