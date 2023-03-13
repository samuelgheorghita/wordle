import React from "react";

const Row = ({ currentGuess, guess }) => {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, i) => {
          return (
            <div className={`letter ${letter.color}`} key={i}>
              {letter.key}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");

    return (
      <div className="row current">
        {letters.map((letter, i) => {
          return (
            <div key={i} className={`letter filled`}>
              {letter}
            </div>
          );
        })}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i} className="letter"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="letter"></div>
      <div className="letter"></div>
      <div className="letter"></div>
      <div className="letter"></div>
      <div className="letter"></div>
    </div>
  );
};

export default Row;
