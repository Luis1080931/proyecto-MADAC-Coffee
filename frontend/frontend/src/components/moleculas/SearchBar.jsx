import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    onSearch(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (

    <form onSubmit={handleSubmit} style={{ marginLeft: '77%', marginTop: '30px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Buscar"
          style={{
            borderRadius: '20px',
            paddingLeft: '40px',
            paddingRight: '10px',
            height: '35px',
            border: 'none',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 2.0)',
          }}
          value={searchTerm}
          onChange={handleChange}
        />
        <FaSearch
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            color: '#ccc',
            zIndex: '1',
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
