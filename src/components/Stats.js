import React, { useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";

const Stats = ({ isStatsOpen, turn, setIsStatsOpen }) => {
  const [stats, setStats] = useState({});
  const outerModal = useRef(null);

  useEffect(() => {
    const newStats = JSON.parse(window.localStorage.getItem("statistics"));
    setStats(newStats);
  }, [turn]);

  const elaborateGraph = () => {
    const graph = { ...stats.guesses };
    let highestWin = 0;

    // Find highest value
    for (const current in graph) {
      highestWin = highestWin > graph[current] ? highestWin : graph[current];
    }

    const tempArray = [];

    // Assign width
    for (let [key, value] of Object.entries(graph)) {
      value = 5 + (value * 95) / highestWin;
      tempArray.push(value);
    }

    return tempArray;
  };

  let graph = stats?.guesses ? elaborateGraph() : null;

  return (
    <div className={`stats-modal ${isStatsOpen ? "visible" : ""}`} onClick={() => setIsStatsOpen(false)}>
      <div className="stats-modal__content " onClick={(e) => e.stopPropagation()}>
        <h2>Statistics</h2>
        <div className="details">
          <div>
            <div className="value">{stats.gamesPlayed}</div>
            <div className="label">Played</div>
          </div>
          <div>
            <div className="value">{Math.round(stats.winPercentage)}</div>
            <div className="label">Win %</div>
          </div>
          <div>
            <div className="value">{stats.currentStreak}</div>
            <div className="label">Current Streak</div>
          </div>
          <div>
            <div className="value">{stats.maxStreak}</div>
            <div className="label">Max streak</div>
          </div>
        </div>
        <h2>Guess Distribution</h2>
        <div className="guess-distribution">
          {graph &&
            graph.map((elem, index) => {
              return (
                <div className="parent-div" key={index}>
                  <div className="label">{index + 1}</div>
                  <div className="value" style={{ width: `${elem}%` }}>
                    {stats.guesses[index + 1]}
                  </div>
                </div>
              );
            })}
        </div>
        <button className="icon-x" onClick={() => setIsStatsOpen(false)}>
          <BsXLg />
        </button>
      </div>
    </div>
  );
};

export default Stats;
