import React, { useContext, useEffect, useState } from "react";
import { BsArrowCounterclockwise, BsQuestionCircle } from "react-icons/bs";
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
        <a className="icon-react icon-help" href="https://inews.co.uk/news/technology/wordle-what-how-play-word-game-free-online-rules-explained-1383747" target="_blank" rel="noopener noreferrer" title="Help">
          <BsQuestionCircle />
          <span className="visually-hidden">Help</span>
        </a>
        <h1>Wordle</h1>
        <button className="icon-react icon-stats" onClick={() => setIsStatsOpen(true)} title="Statistics">
          <IoStatsChartSharp />
          <span className="visually-hidden">Statistics</span>
        </button>
        <button className="icon-react" onClick={restartGame} title="Restart">
          <BsArrowCounterclockwise />
          <span className="visually-hidden">Restart</span>
        </button>
      </header>
      <Stats {...{ turn, isStatsOpen, setIsStatsOpen }} />
    </>
  );
};

export default Header;
