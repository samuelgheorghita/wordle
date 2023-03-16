import React from "react";
import { qwertyLetters } from "../data/letters";

const Keyboard = ({ usedKeys }) => {
  const rowUI = (index) => {
    return qwertyLetters[index].map((letter, index) => {
      const color = usedKeys[letter.key];
      return (
        <div className={`letter ${color}`} key={index}>
          {letter.key}
        </div>
      );
    });
  };

  return (
    <section className="keyboard">
      <h2 className="visually-hidden">Keyboard</h2>
      <div className="keyboard__row">{rowUI(0)}</div>
      <div className="keyboard__row">{rowUI(1)}</div>
      <div className="keyboard__row">{rowUI(2)}</div>
    </section>
  );
};

export default Keyboard;
