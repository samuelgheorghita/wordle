import React from "react";

import Row from "./Row";

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <div className="grid" tabIndex="0">
      {guesses.map((guess, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        return <Row key={i} guess={guess} />;
      })}
    </div>
  );
};

export default Grid;
