import React from 'react';
import './style.css';
import pokemonType from '../../helpers/typeColors';
import { useHistory } from 'react-router-dom';


function Card({ pokemon }) {

    let history = useHistory();
    return(
   <div className="Card" onClick={() => history.push("/"+pokemon.id)} key={pokemon.id}>

            <div className="Card_img">
                <img src={pokemon.sprites.front_default} alt="Pokemon sprite" />
            </div>

            <div className="Card_name">
                {pokemon.name}
            </div>

         

  
        </div>
    );
}

export default Card;