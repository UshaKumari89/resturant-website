import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.scss';

const Search = ({ foodItems, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    onSearch(query);
  };

  
  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="What are you looking for?"
          value={searchQuery}
          // onChange={handleInputChange}
          onChange={(event) => handleInputChange(event)}
        />
        <button type="submit" className="searchButton">
          <FontAwesomeIcon icon={faSearch} className="searchIcon" />
        </button>
      </div>
    </div>
  );
};

export default Search;
