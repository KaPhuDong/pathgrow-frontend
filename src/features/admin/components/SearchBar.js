import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ filterName, setFilterName, setSearchName }) => (
  <div className="d-flex align-items-center gap-2">
    <input
      type="text"
      className="form-control rounded-pill px-3"
      placeholder="Search..."
      value={filterName}
      onChange={(e) => setFilterName(e.target.value)}
    />
    <FaSearch
      style={{
        cursor: 'pointer',
        position: 'relative',
        right: '30px',
        color: 'var(--primary)',
      }}
      onClick={() => setSearchName(filterName)}
    />
  </div>
);

export default SearchBar;
