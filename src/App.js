import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Board from "./components/Board/Board";
import { useState } from "react";

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
