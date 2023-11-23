
import React, { useState } from 'react';
import './Search.scss'; // Import your Search component styles

const Search = ({ foodItems, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const filtered = foodItems.filter(food =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(filtered);
  };

  return (
    <div className="page-container">
      <div className="search-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for your favourite food here !!!"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button onClick={handleSearchClick}>
            Search <i className="fa fa-search"></i> {/* Assuming you're using Font Awesome */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
