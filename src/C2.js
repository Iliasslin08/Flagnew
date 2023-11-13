import React ,{useState} from 'react'
import './C2.css'
function C2(props) {
    const[ChoixRe,setChoixRe]=useState('choise type recherche')
    const[Nom,setNom]=useState('')
    const[Poste,setPoste]=useState('')
    
  return (
    <div className='divkbira'>
    <div className='div2'>
      <h1>Liste des employe par {ChoixRe}</h1>
    <input  type='radio' value='nom' name='choix' onChange={(e)=>setChoixRe(e.target.value)} /> 
    <label>Recherche par nom :</label>
    <input type='text' onChange={(o)=>setNom(o.target.value)} />
    <br></br>
    <input type='radio'  value='poste' name='choix' onChange={(z)=>setChoixRe(z.target.value)}  />
    <label>Recherche par poste :</label>
    <select onChange={(w)=>setPoste(w.target.value)} >
        <option>choisie poste</option>
    {props.composant.map((option)=>
      <option>{option.poste}</option> 
    )
    }
    </select>
    </div>
    <div>
{props.composant
.filter((index)=>{
    if (ChoixRe==='nom'){return index.nom===Nom ;}
    else if (ChoixRe ==='poste'){return index.poste===Poste}
}) 
 .map((indexmap) => (
  <div className='divww'>
    <div className='aa'>
      <h1>odoo</h1>
      <img src={indexmap.photo} alt={indexmap.nom} />
    </div>
    <div className='ww'>
      <h3>{indexmap.nom}</h3>
      <p>ID: {indexmap.id}</p>
      <p>Salaire: {indexmap.salaire}</p>
    </div>
 
  </div>
))}
</div>
    </div>
  )
}

export default C2
