import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './Flag.css'

function FlagGame() {
  const [allFlags, setAllFlags] = useState([]);
  const [randomFlagImage, setRandomFlagImage] = useState(null);
  const [randomCountryName, setRandomCountryName] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState(1);
  const [niveau, setNive] = useState("votre stage est:");
  const [niveau1, setNive1] = useState(" stage1:correct[5] incorrect[2]");
  const [niveau2, setNive2] = useState(" stage2:correct[15] incorrect[5]");
  const [niveau3, setNive3] = useState(" stage3:correct[35] incorrect[10]");

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

    // Shuffle the options, including the correct answer
    const shuffledOptions = [randomFlag.name.common, ...otherOptions].sort(() => Math.random() - 0.5);

    setOptions(shuffledOptions);
    setNive1('');
    setNive2('');
    setNive3('');
  }

  function addCount() {
    setCount(count + 1);
  }

  function rules() {
    if (score.correct >= 5 && score.fals <= 2 && stage === 1) {
      alert("FELICITATION 1 ERE STAGE");
      const pass = window.confirm("vous pass a prochain stage");
      if (pass) {
        setStage(2);
        setScore({ correct: 0, fals: 0 });
        setCount(0);
        setRandomFlagImage(null);
        setRandomCountryName(null);
        setOptions([]);
        getRandom(); // Start the next stage
      }
    } else if (score.correct <= 5 && score.fals >= 2 && stage === 1) {
      alert("vous ayes echoue😪");
      const pass2 = window.confirm("Rejouer?");
      if (pass2) {
        setScore({ correct: 0, fals: 0 });
        setCount(0);
        setRandomFlagImage(null);
        setRandomCountryName(null);
        setOptions([]);
        getRandom(); // Start the next stage
      }
    } else if (score.correct >= 15 && score.fals <= 5 && stage === 2) {
      alert("FELICITATION 2 EME STAGE");
      const pass2 = window.confirm("vous pass 3 eme stage");
      if (pass2) {
        setStage(3);
        setScore({ correct: 0, fals: 0 });
        setCount(0);
        setRandomFlagImage(null);
        setRandomCountryName(null);
        setOptions([]);
        getRandom(); // Start the next stage
      }
    } else if (score.correct <= 15 && score.fals >= 5 && stage === 2) {
      alert("Vous avez echoue😪");
      const pass3 = window.confirm("Rejouer?");
      if (pass3) {
        setStage(1);
        setScore({ correct: 0, fals: 0 });
        setCount(0);
        setRandomFlagImage(null);
        setRandomCountryName(null);
        setOptions([]);
        getRandom();
      }
    } else if (score.correct >= 35 && score.fals <= 10 && stage === 3) {
      alert("FELICITATION 3 EME STAGE");
      const pass3 = window.confirm("vous avez termine le jeu rejouer");
      if (pass3) {
        setStage(1);
        setScore({ correct: 0, fals: 0 });
        setCount(0);
        setRandomFlagImage(null);
        setRandomCountryName(null);
        setOptions([]);
        getRandom();
      }
    } else if (score.correct <= 35 && score.fals >= 10 && stage === 3) {
      alert("Vous avez echoue😪");
      const pass4 = window.confirm("Rejouer?");
      if (pass4) {
        setStage(1);
        setScore({ correct: 0, fals: 0 });
        setCount(0);
        setRandomFlagImage(null);
        setRandomCountryName(null);
        setOptions([]);
        getRandom();
      }
    }
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
    rules();
  }

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6} className="text-center">
          <h1>Flag Guessing Game</h1>
          <div className="score">
            <p className="p1">Correct Answers: {score.correct}</p>
            <p className="p2">Incorrect Answers: {score.fals}</p>
          </div>

          <Button
            className="button btn-primary"
            style={{ display: randomFlagImage ? "none" : "block" }}
            onClick={getRandom}
          >
            ARE YOU READY?
          </Button>

          <h4 className="mt-3">Votre stage est: {stage}</h4>
          <h5>{niveau1}</h5>
          <h5>{niveau2}</h5>
          <h5>{niveau3}</h5>

          {randomFlagImage && (
            <img className="flag-image mt-3" src={randomFlagImage} alt="Flag" />
          )}

          <div className="options mt-3">
            {options.map((option, index) => (
              <Button
                key={index}
                className="option btn btn-light m-2"
                onClick={() => changeValue(option)}
              >
                {option}
              </Button>
            ))}
            <p className="mt-3">{`${count}/${totalFlags}`}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}


export default FlagGame;
