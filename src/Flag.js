import React, { useState, useEffect } from "react";
import "./Flag.css";

function FlagGame() {
  const [allFlags, setAllFlags] = useState([]);
  const [randomFlagImage, setRandomFlagImage] = useState(null);
  const [randomCountryName, setRandomCountryName] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState({
    correct: 0,
    fals: 0,
  });
  const [lastRandomFlagIndex, setLastRandomFlagIndex] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setAllFlags(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const totalFlags = allFlags.length;

  function getRandom() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * allFlags.length);
    } while (randomIndex === lastRandomFlagIndex);

    setLastRandomFlagIndex(randomIndex);

    const randomFlag = allFlags[randomIndex];
    setRandomFlagImage(randomFlag.flags.png);
    setRandomCountryName(randomFlag.name.common);

    const otherOptions = [];
    while (otherOptions.length < 3) {
      const optionIndex = Math.floor(Math.random() * allFlags.length);
      const optionFlag = allFlags[optionIndex];
      if (
        optionFlag.name.common !== randomFlag.name.common &&
        !otherOptions.includes(optionFlag.name.common)
      ) {
        otherOptions.push(optionFlag.name.common);
      }
    }
    setOptions([randomFlag.name.common, ...otherOptions]);
  }

  function addCount() {
    setCount(count + 1);
  }

  function changeValue(selectedOption) {
    setSelectedOption(selectedOption);
    if (selectedOption === randomCountryName) {
      setScore((oldScore) => ({
        ...oldScore,
        correct: oldScore.correct + 1,
      }));
    } else {
      setScore((oldScore) => ({
        ...oldScore,
        fals: oldScore.fals + 1,
      }));
    }
    getRandom();
    addCount();
  }

  return (
    <div className="container">
      <center>
        <h1>Flag Guessing Game</h1>
      </center>
      <div className="center">
        <div className="score">
          <p>Correct Answers: {score.correct}</p>
          <p>Incorrect Answers: {score.fals} </p>
        </div>
        <button className="button" onClick={getRandom}>
          play
        </button>
        <br />
        {randomFlagImage && (
          <img className="flag-image" src={randomFlagImage} alt="Flag" />
        )}
        <br />
        <div className="options">
          {options.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => changeValue(option)}
            >
              {option}
            </div>
          ))}
          <p>{`${count}/${totalFlags}`}</p>
        </div>
      </div>
    </div>
  );
}

export default FlagGame;
