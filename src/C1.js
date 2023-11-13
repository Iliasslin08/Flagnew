import React from 'react';
import './C1.css';

function C1(props) {
  return (
    <div className='div1'>
      <div>
        <h1>odoo</h1>
        <img src={props.composant.photo} alt="Photo de profil" />
      </div>
      <div>
        <h3>{props.composant.nom} {props.composant.prenom}</h3>
        <p>ID: {props.composant.id}</p>
        <p>Salaire: {props.composant.salaire}</p>
      </div>
    </div>
  );
}

export default C1;
