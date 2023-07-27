import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Header from "./Header";
import Keyboard from "./Keyboard";
import Modal from "./Modal";

const Wordle = ({ solution, dictionary }) => {
  const { currentGuess, guesses, handleKeyUp, isCorrect, resetGame, turn, usedKeys, setIsCorrect, setTurn } = useWordle(solution, dictionary);
  const isGameEnded = isCorrect || turn === 6;

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      window.removeEventListener("keyup", handleKeyUp);
    }
    if (turn > 5) {
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  useEffect(() => {
    const stats = JSON.parse(window.localStorage.getItem("statistics"));
    if (stats) {
      if (isGameEnded) {
        stats.gamesPlayed++;
        if (isCorrect) {
          stats.gamesWon++;
          stats.winPercentage = (stats.gamesWon / stats.gamesPlayed) * 100;
          stats.currentStreak++;
          if (stats.currentStreak > stats.maxStreak) stats.maxStreak++;
          stats.guesses[turn]++;
          stats.averageGuess = calculateAverageGuess(stats.guesses, stats.gamesWon);
        } else {
          stats.currentStreak = 0;
        }
        window.localStorage.setItem("statistics", JSON.stringify(stats));
      }
    } else {
      window.localStorage.setItem(
        "statistics",
        JSON.stringify({
          gamesPlayed: 0,
          gamesWon: 0,
          winPercentage: 0,
          currentStreak: 0,
          maxStreak: 0,
          guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
          averageGuess: 0,
        })
      );
    }
  });

  const calculateAverageGuess = (obj, gamesWon) => {
    let sum = 0;
    for (let [key, value] of Object.entries(obj)) {
      sum += key * value;
    }
    const averageGuess = sum / gamesWon;
    const roundedGuess = Math.round(averageGuess * 100) / 100;
    return roundedGuess;
  };

  return (
    <>
      <div className="wordle">
        <Header resetGame={resetGame} turn={turn} />
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        <Keyboard usedKeys={usedKeys} />
        <Modal isCorrect={isCorrect} setIsCorrect={setIsCorrect} turn={turn} solution={solution} setTurn={setTurn} isGameEnded={isGameEnded} />
        {/* <ErrorMessage /> */}
      </div>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" toastStyle={{ backgroundColor: "rgb(110, 0, 0)" }} />
    </>
  );
};

export default Wordle;
