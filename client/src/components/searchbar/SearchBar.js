import React from 'react';
import './SearchBar.css';

import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className='search-container'>
      <input type="text" className='search-input' placeholder="Search..." name="search" />
      <button type="submit" className='search-button'><SearchIcon /></button>
    </div>
  )
}

export default SearchBar