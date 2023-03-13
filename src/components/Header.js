import React, { useContext, useEffect, useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { IoStatsChartSharp } from "react-icons/io5";

import { AppContext } from "../contexts/AppContext";
import Stats from "./Stats";

const Header = ({ resetGame, stats, turn }) => {
  const { solution, setSolution, popularWords } = useContext(AppContext);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const restartGame = (e) => {
    const count = 1000;
    const randomNumber = Math.floor(Math.random() * count);
    setSolution(popularWords[randomNumber]);

    resetGame();

    // Losing focus on the button
    e.target.parentElement.blur();
  };

  return (
    <>
      <header className="header">
        <h1>Wordle</h1>
        <button className="icon-react icon-stats" onClick={() => setIsStatsOpen(true)}>
          <IoStatsChartSharp />
        </button>
        <button className="icon-react" onClick={restartGame}>
          <BsArrowCounterclockwise />
        </button>
      </header>
      <Stats turn={turn} isStatsOpen={isStatsOpen} setIsStatsOpen={setIsStatsOpen} />
    </>
  );
};

export default Header;
