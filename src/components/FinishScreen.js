import { Fragment } from "react";
import { useQuiz } from "../context/QuizContext";

function FinishScreen() {

  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <Fragment>
      <div className="result">
        <p>
          You scored <strong>{points} </strong> out of {maxPossiblePoints} (
          {percentage.toFixed(2)}%)
        </p>
        <p>And your high score is {highscore} </p>
      </div>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </Fragment>
  );
}

export default FinishScreen;
