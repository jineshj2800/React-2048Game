import React, { useState, useEffect } from "react";

export default function GameOver({ gameState, onTryAgain }) {
  const [status, setStatus] = useState("running");

  useEffect(() => {
    const isNotOver = gameState.some((value, index) => {
      return (
        value === 0 ||
        value === gameState[index + 4] ||
        (index % 4 !== 3 && value === gameState[index + 1])
      );
    });
    if (isNotOver === false) setStatus("over");
  }, [gameState]);

  function handleTryAgainClick() {
    onTryAgain();
    setStatus("running");
  }

  if (status === "running") return null;
  return (
    <div className="game-over">
      <div>Game Over !!</div>
      <button className="try-again" onClick={handleTryAgainClick}>
        Try again
      </button>
    </div>
  );
}
