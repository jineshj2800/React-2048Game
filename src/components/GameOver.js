import React from "react";

export default function GameOver({ gameState, onTryAgain }) {
  const isNotOver = gameState.some((value, index) => {
    return (
      value === 0 ||
      (index + 4 < gameState.length && value === gameState[index + 4]) ||
      (index + 1 < gameState.length &&
        index % 4 !== 3 &&
        value === gameState[index + 1])
    );
  });

  if (isNotOver) return null;
  return (
    <div className="game-over">
      <div>Game Over !!</div>
      <button className="try-again" onClick={onTryAgain}>
        Try again
      </button>
    </div>
  );
}
