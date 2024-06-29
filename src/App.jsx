import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import PokemonDisplay from './PokemonDisplay';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokemon no encontrado');
          }
          return response.json();
        })
        .then(data => {
          setPokemon(data);
          setError('');
        })
        .catch(err => {
          setError(err.message);
          setPokemon(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <h1>Buscador de Pokémon</h1>
      <SearchForm searchTerm={searchTerm} handleChange={handleChange} />
      {loading && <p>Cargando...</p>}
      <PokemonDisplay pokemon={pokemon} error={error} />
    </div>
  );
}

export default App;