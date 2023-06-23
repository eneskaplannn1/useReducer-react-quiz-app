import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./utilits/Loader";
import Error from "./utilits/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import { useQuiz } from "./context/QuizContext";

function App() {
  const { status, answer, index, dispatch } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Timer />
            {answer !== null && index <= 13 ? (
              <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "newQuestion" })}
              >
                Next
              </button>
            ) : (
              ""
            )}
            {index > 13 ? (
              <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "finished" })}
              >
                Finish
              </button>
            ) : (
              ""
            )}
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
