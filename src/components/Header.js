import React, { useEffect, useState } from "react";

export default function Header({ score }) {
  const [bestScore, setBestScore] = useState(
    () => window.localStorage.getItem("bestScore") || 0
  );

  useEffect(() => {
    if (bestScore < score) {
      setBestScore(score);
      window.localStorage.setItem("bestScore", score);
    }
  }, [bestScore, score]);

  return (
    <div className="head-container">
      <div className="game-title">2048</div>
      <div className="score-title">
        <span>SCORE</span>
        <span data-testid="score" className="score-value">
          {score}
        </span>
      </div>
      <div className="score-title">
        <span>BEST</span>
        <span data-testid="best-score" className="best score-value">
          {bestScore}
        </span>
      </div>
    </div>
  );
}
