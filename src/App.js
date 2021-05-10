import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';
import { Navbar } from './components/Navbar/Navbar';
import { Card } from './components/Card/Card';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, seetLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      console.log(response);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      seetLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    seetLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    seetLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    seetLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    seetLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getAllPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  return (
    <div className="App">
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          
          <Navbar />
          <div className="btn">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
