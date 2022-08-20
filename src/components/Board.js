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

  /*
    We must not think of useEffect dependency array as something
    which should be used to re-run the effect callback. Instead,
    we must put all the dependencies (i.e. all variables used in
    the callback) inside the dependency array and then put the
    condition inside the callback itself.
    Like this:

    useEffect(() => {
      if(areEqual(gameState, initialState)) {
        const newGameState = generatetNewRandomCell(gameState)
        setGameState(newGameState)
      }
    }, [gameState, initialState])

    You do not need to optimize the number of times the effect callback
    function is called. You need to add all the variables used inside
    the effect callback to the dependency array, there are very few
    exceptions to this rule.
  */
  useEffect(() => {
    const newGameState = generatetNewRandomCell(gameState);
    setGameState(newGameState);
  }, [areEqual(gameState, initialState)]);

  /*
    Again, here also in the dependency array, updateBoard should have
    been added because it is a local variable and is being used inside
    the effect callback.
    But, also note that updateBoard is being created afresh in every
    render, so if you add it to the dependency array, then the effect
    callback will run on each render. So, you must wrap updateBoard 
    in useCallback so that it is "not created" on every render.

    const updateBoard = useCallback((gameState, keyPressed) => {
      ...
    }, [onScoreChange]);

    Also, always try to use variables only after declaration, then the flow
    of the code is easy to understand. For example, put the code of updateBoard
    before its usage in the effect callback.
  */
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

  /*
    This function can be moved outside the render of Board component
    as it does not use any information from the closure (i.e. state or
    local variables). 
    By moving it outside, you will not be recreating it on each render.
    Also, then you would not have to add it to the dependency array of
    effect callbacks.
  */
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

  /*
    Wrap this function in useCallback as we don't know if it could
    be used in some dependency array in child component.

    const handleRestart = useCallback(() => {
      onScoreChange(0);
      setGameState(initialState);
    }, [onScoreChange]);
  */
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
