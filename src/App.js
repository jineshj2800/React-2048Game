import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Board from "./components/Board/Board";
import { useState } from "react";

/*
  Code directory structure:

  It is suggested that you keep all the code used by a particular component
  in a directory created for that component. Also, in that directory, if
  there are components, hooks, utils, constants or types, they must be put
  in separate directories or files.

  The code for this project can be structured as follows (only JS files are discussed):

  src
  |
  |_App.js
  |_components
    |
    |_board
      |
      |_Board.js
      |_traversalOrder.js
    |
    |_Cell.js
    |
    |_GameOver.js
    |
    |_Header.js
*/

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="container">
      <Header score={score} />
      <Board score={score} onScoreChange={setScore} />
    </div>
  );
}

export default App;
