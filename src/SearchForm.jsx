import React from 'react';

function SearchForm({ searchTerm, handleChange }) {
  return (
    <input
      type="text"
      placeholder="Busca un Pokémon"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchForm;