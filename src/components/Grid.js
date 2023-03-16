import React from "react";

import Row from "./Row";

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <section className="grid" tabIndex="0">
      <h2 className="visually-hidden">Grid with words</h2>
      {guesses.map((guess, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        return <Row key={i} guess={guess} />;
      })}
    </section>
  );
};

export default Grid;
