import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';
import Card from './components/Card'
import './App.css';
import loadingImg from './images/loading.gif';
import { useHistory } from 'react-router-dom';
import { BiSearchAlt2, BiFirstPage } from 'react-icons/bi';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const Pokedex = () => {

  let history = useHistory();
  const [search, setSearch] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const fPage = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=16';


  var initialUrl = sessionStorage.getItem('nextUrl');
  if(!initialUrl) {
  var initialUrl = fPage;
  }

  //Fetch pokemon data from API
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl)
      setNextUrl(response.next);   
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

    //Next Page function
    const next = async(props) => {
      setLoading(true);
      let data = await getAllPokemon(nextUrl)
      sessionStorage.setItem('nextUrl', nextUrl);
      await loadingPokemon(data.results)
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      setLoading(false);    
    
    }

     //Prev page function
  const prev = async() => {
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl)
    sessionStorage.setItem('nextUrl', prevUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
     
  }

  //Go to first page
  const first = async() => {
    if(!prevUrl) return;
    setLoading(true);
    let response = await getAllPokemon(fPage);
    sessionStorage.setItem('nextUrl', fPage);
    setNextUrl(response.next);   
    setPrevUrl(response.previous);
    await loadingPokemon(response.results);
    setLoading(false);
  }
 


  //Load pokemons on the page
  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }));
    setPokemonData(_pokemonData);
  }

  return (
    <div>
    { loading ? <h1> <img src={loadingImg} alt="Loading..."  width="10%"/></h1> : (
      <>
    
      <div className="btn_search">
      <input className="input" type="text" onChange={e => setSearch(e.target.value)}  placeholder="Search by name or ID" />  <button onClick={() => history.push("/"+search)} > <BiSearchAlt2 size={15} color="#fff"/></button>
      </div>
      <div className="btn">
        <button onClick={first}><BiFirstPage size={25} color="#fff"/></button>
        <button onClick={prev}><MdNavigateBefore size={25} color="#fff"/></button>
        <button onClick={next}><MdNavigateNext size={25} color="#fff"/></button>
      </div>
      <div className="grid-container">
        {pokemonData.map((pokemon) => {
            
          return <Card key={pokemon.id} pokemon={pokemon}/> 
          
        })}
        </div>
        <div className="btn">
        <button onClick={first}><BiFirstPage size={25} color="#fff"/></button>
        <button onClick={prev}><MdNavigateBefore size={25} color="#fff"/></button>
        <button onClick={next}><MdNavigateNext size={25} color="#fff"/></button>
      </div>
        </>
    )}
    </div>
  );
}

export default Pokedex;
