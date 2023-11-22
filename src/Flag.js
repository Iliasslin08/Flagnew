import React, { useState, useEffect } from 'react';
import './Flag.css';

function Flag() {
  const [ALLflag, setAllFlag] = useState([]);
  const [random, setRandom] = useState(null);
  const [random2, setRandom2] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState({
    correct: 0,
    fals: 0,
  });

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => setAllFlag(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function getRandom() {
    const randomIndex = Math.floor(Math.random() * ALLflag.length);
    const randomFlag = ALLflag[randomIndex];
    setRandom(randomFlag.flags.png);
    setRandom2(randomFlag.name.common);

    const otherOptions = [];
    while (otherOptions.length < 3) {
      const optionIndex = Math.floor(Math.random() * ALLflag.length);
      const optionFlag = ALLflag[optionIndex];
      if (optionFlag.name.common !== randomFlag.name.common) {
        otherOptions.push(optionFlag.name.common);
      }
    }
    setOptions([randomFlag.name.common, ...otherOptions]);
  }
  function changevalue(selectedOption) {
    setSelectedOption(selectedOption);
    if(selectedOption===random2){
      setScore((oldscore)=>({
        ...oldscore,
          correct:oldscore.correct+1
      })) 
    }else {
      setScore((oldscore)=>({
        ...oldscore,
        fals:oldscore.fals+1
      }))
    }
  }

  return (
    <div className="container">
     <center><h1>games flags</h1></center> 
      <div className="center">
        <div className="score">
          <p>BONNE REPONSE : {score.correct}</p>
          <p>MAUVAISE REPONSE: {score.fals} </p>
        </div>
        <button className="button" onClick={getRandom}>
         next one
        </button>
        <br />
        {random && <img className="flag-image" src={random} alt="Flag" />}
        <br />

        <div className="options">
          {options.map((option, index) => (
            <div key={index} className="option" onClick={() => changevalue(option)}>
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Flag;
