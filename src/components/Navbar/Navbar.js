import React from 'react';
import './style.css';
import loadingImg from '../../images/logo3.png';

function Navbar() {
    return(
    <div className="Navbar">
      <img src={loadingImg} alt="Logo"  width="180px"/>
    </div>
    );
}

export default Navbar