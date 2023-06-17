import { Fragment } from "react";

function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
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
