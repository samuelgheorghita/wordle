import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const useWordle = (solution = "plain", dictionary) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false); // For checking the win state
  const [usedKeys, setUsedKeys] = useState({});
  const { setErrorMessage, notify } = useContext(AppContext);

  // format a guess into an array of objects
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => ({ key: letter, color: "absent" }));

    // find any green letters
    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "correct";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== "correct") {
        formattedGuess[i].color = "present";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  // 1) Adds a new guess - 2) Checks for Win - 3) Adds currentGuess to history - 4) Increases turn
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => [...prevHistory, currentGuess]);

    setTurn(turn + 1);
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.keys];

        if (letter.color === "correct") {
          newKeys[letter.key] = "correct";
          return;
        }
        if (letter.color === "present" && currentColor !== "correct") {
          newKeys[letter.key] = "present";
          return;
        }
        if (letter.color === "absent" && currentColor !== "correct" && currentColor !== "present") {
          newKeys[letter.key] = "absent";
          return;
        }
      });
      return newKeys;
    });

    setCurrentGuess("");
  };

  // Handles keyup events, including backspace and enter
  const handleKeyUp = (e) => {
    if (/^[a-zA-Z]$/.test(e.key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prevState) => prevState + e.key);
      }
    } else if (e.key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (e.key === "Enter") {
      // If focus is present on any buttons, otherwise, for example, when clicking the restart btn, it will guess the word instead
      if (e?.target?.className?.includes("icon-react")) return;
      // If guess not valid return
      if (!checkWordValidity()) {
        return;
      }

      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
    }
  };

  const checkWordValidity = () => {
    // Don't add if the player already guessed 6 times
    if (turn > 5) {
      return;
    }
    // Do not allow duplicate words
    if (history.includes(currentGuess)) {
      notify("You already tried that word");
      return;
    }
    // Submit guess only if 5 letters long
    if (currentGuess.length !== 5) {
      notify("Word must be 5 letters long");
      return;
    }
    // If guess is not present in the dictionary
    if (!dictionary.includes(currentGuess)) {
      setErrorMessage("not in word list");
      notify("not in word list");
      return;
    }

    return true;
  };

  const resetGame = () => {
    setTurn(0);
    setCurrentGuess("");
    setGuesses([...Array(6)]);
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp, resetGame, setIsCorrect, setTurn };
};

export default useWordle;
