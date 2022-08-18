import React from "react";
import "../styles.css";

export default function Header({ score }) {
  let bestScore = window.localStorage.getItem("bestScore") || 0;
  if (bestScore < score) {
    bestScore = score;
    window.localStorage.setItem("bestScore", score);
  }

  return (
    <div className="head-container">
      <div className="game-title">2048</div>
      <div className="score-title">
        <span>SCORE</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-title">
        <span>BEST</span>
        <span className="best score-value">{bestScore}</span>
      </div>
    </div>
  );
}
