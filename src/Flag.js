import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
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
  const [niveau,setnive]=useState("votre stage est:")
  const [niveau1,setnive1]=useState(" stage1:correct[5] incorrect[2]")
  const [niveau2,setnive2]=useState(" stage2:correct[15] incorrret[5]")
  const [niveau3,setnive3]=useState(" stage3:corrrect[35] incorrect[10]")
  
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
    setnive1('')
    setnive2('')
    setnive3('')

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
    } else if (score.correct >= 15 && score.fals <=5 && stage === 2) {
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
      const pass3 = window.confirm("vous avez termine le jeu");
      if (pass3) {
      
      }
    } else if (score.correct <= 35 && score.fals <= 10 && stage === 3) {
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
    <Container>
      <Row className="justify-content-center">
        <Col xs={5} md={8} lg={16}>
          <h1 className="text-center">Flag Guessing Game</h1>
          <div className="score text-center">
            <p className="p1"> Correct Answers: {score.correct}</p>
            <p className="p2"> Incorrect Answers: {score.fals} </p>
          </div>
  
          <Button
            className="button"
            style={{ display: randomFlagImage ? "none" : "block" }}
            onClick={getRandom}
          >
            ARE YOU READY?
          </Button>
           <h4>votre stage est:{stage}</h4>
          <h5> {niveau1}</h5>
          <h5> {niveau2}</h5>
          <h5> {niveau3}</h5>
          <br />
          {randomFlagImage && (
            <img className="flag-image" src={randomFlagImage} alt="Flag" />
          )}
          <br />
          <div className="options text-center">
            {options.map((option, index) => (
              <Button
                key={index}
                className="option btn btn-light"
                onClick={() => changeValue(option)}
              >
                {option}
              </Button>
            ))}
            <p>{`${count}/${totalFlags}`}</p>
           

          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FlagGame;
