import React from "react";
import "../styles.css"; // Why is styles.css imported here when it is already imported in App.js ?

export default function Header({ score }) {
  /*
    You should not read from local storage on every render because
    reading from local storage is expensive (i.e. is time consuming).
    In fact, it should be read only once.

    Also, you should not write to local storage in the render cycle
    as it is an effect-ful thing and hence must be done in useEffect.

    So, you could rewrite this bit of code like this:

    const [bestStore, setBestScore] = useState(() => window.localStorage.getItem("bestScore") || 0);

    useEffect(() => {
      if(bestScore < score) {
        setBestScore(score);
        window.localStorage.setItem("bestScore", score);
      }
    }, [score]);
  */
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
