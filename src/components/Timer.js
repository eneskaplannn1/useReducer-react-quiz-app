import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining - min * 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [secondsRemaining, dispatch]);
  return (
    <div className="timer">
      {min < 10 ? "0" : ""}
      {min}:
      {sec < 10 ? "0" : ""}
      {sec}
    </div>
  );
}

export default Timer;
