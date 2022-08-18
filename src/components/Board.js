import { useEffect, useState } from "react";
import "../styles.css";
import Cell from "./Cell";
import GameOver from "./GameOver";
import { getTraversalOrder } from "../traversalOrder";

const initialState = Array(16).fill(0);

function areEqual(arg1, arg2) {
  return JSON.stringify(arg1) === JSON.stringify(arg2);
}

export default function Board({ score, onScoreChange }) {
  const [gameState, setGameState] = useState(initialState);

  useEffect(() => {
    const newGameState = generatetNewRandomCell(gameState);
    setGameState(newGameState);
  }, [areEqual(gameState, initialState)]);

  useEffect(() => {
    function handleKeyDown(e) {
      const shiftedGameState = updateBoard(gameState, e.key);
      if (areEqual(shiftedGameState, gameState)) return null;
      const newGameState = generatetNewRandomCell(shiftedGameState);
      setGameState(newGameState);
    }
    window.addEventListener("keydown", handleKeyDown);

    return function cleanUp() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  function updateBoard(gameState, keyPressed) {
    const traverseOrder = getTraversalOrder(keyPressed);
    if (traverseOrder === null) return gameState;
    const cellValues = [...gameState];

    for (let row of traverseOrder) {
      let prevCell = {
        value: -1,
        index: -1,
        canMerge: false,
      };
      let nextFill = 0;
      for (let col = 0; col < row.length; col++) {
        let currIndex = row[col];

        if (cellValues[currIndex] === 0) continue;
        if (prevCell.canMerge && prevCell.value === cellValues[currIndex]) {
          prevCell.value += cellValues[currIndex];
          cellValues[prevCell.index] = prevCell.value;
          prevCell.canMerge = false;
          cellValues[currIndex] = 0;
          onScoreChange(score + prevCell.value);
        } else {
          let temp = cellValues[currIndex];
          cellValues[currIndex] = 0;
          cellValues[row[nextFill]] = temp;
          prevCell.index = row[nextFill];
          prevCell.value = temp;
          prevCell.canMerge = true;
          nextFill++;
        }
      }
    }
    return cellValues;
  }

  function generatetNewRandomCell(gameState) {
    const allCells = [...gameState];
    const emptyCells = [];
    allCells.forEach((value, index) => {
      if (!value) emptyCells.push(index);
    });
    if (emptyCells.length === 0) return allCells;

    const random = Math.floor(Math.random() * emptyCells.length);
    const newIndex = emptyCells[random];
    if (Math.random() < 0.8) allCells[newIndex] = 2;
    else allCells[newIndex] = 4;

    return allCells;
  }

  function handleRestart() {
    onScoreChange(0);
    setGameState(initialState);
  }

  return (
    <>
      <button className="restart" onClick={handleRestart}>
        Restart
      </button>
      <div className="game-container">
        <div className="board">
          {gameState.map((cellValue, index) => {
            return <Cell key={index} value={cellValue} />;
          })}
        </div>
        <GameOver gameState={gameState} onTryAgain={handleRestart} />
      </div>
    </>
  );
}
