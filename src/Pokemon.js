import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import './components/DetailedCard/style.css'
import pokemonType from './helpers/typeColors';
import errorImg from './images/error.png';
import loadingImg from './images/loading.gif';
import { RiArrowGoBackFill } from 'react-icons/ri';


const Pokemon = (props) => {
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemonData, setPokemonData] = useState('');
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonId.toLowerCase())
        .then(response => response.json())
        .then(data => setPokemonData(data)) 
        .catch(function (error) {
          setPokemonData(false);
        });   
        setLoading(false);    
        }, [pokemonId]);
  
        const generatePokemonJSX = (pokemonData) => {
        const { name, id, height, weight, types, abilities } = pokemonData;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        
        return (
            <div>
            {(
              <>        
              <div className="btn">
                <button onClick={() => history.goBack()}><RiArrowGoBackFill size={25} color="#fff"/></button>
              </div>

         <div className="grid-container">

         <div className="Card_big">

<div className="Card_big_img">
    <img src={fullImageUrl} style={{ width: "150px", height: "150px" }} alt="Pokemon sprite" />
</div>

<div className="Card_big_name">
    {name} #{id}
</div>

<div className="Card_big_types">
{types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <div className="Card_big_type" style={{ backgroundColor: pokemonType[name]}} key={name}> {`${name}`}</div>;
        })}
</div>

<div className="Card_big_info">
    <div className="Card_big_data Card_big_data_weight">
   <p className="title">Weight</p>
    <p className="info">{weight}</p>     
    </div>

    <div className="Card_big_data Card_big_data_height">
   <p className="title">Height</p>
    <p className="info">{height}</p>     
    </div>


    <div className="Card_big_data Card_big_data_height">
    <p className="title">Abilities</p>
    </div>
    <div className="Card_big_types">
    {abilities.map((abilitiesInfo) => {
          const { ability } = abilitiesInfo;
          const { name } = ability;
          return <p className="Card_big_type" key={name}> {`${name}`}</p>;
        })}
    </div>
     </div>
      </div>
       </div>
    </>
     )};  </div>  

      )
      };

        return (
          <div>
             { loading ? <h1> <img src={loadingImg} alt="Loading..."  width="10%"/></h1> : (   
            <>           
              {pokemonData !== undefined && pokemonData && generatePokemonJSX(pokemonData)}
              {pokemonData === false && <h1 style={{textAlign: "center", color: "#fff"}}>Ops Pokemon not found! <img src={errorImg} style={{ height: "120px" }}/>
              <div className="btn">
                <button onClick={() => history.push("/")}><RiArrowGoBackFill size={25} color="#fff"/></button>
              </div></h1>}
            </>
            )};
            </div>
          );

}

export default Pokemon;


