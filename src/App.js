import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./utilits/Loader";
import Error from "./utilits/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  //! when app starts
  if (action.type === "loading") return { ...state, status: "loading" };
  // ! when fetching data finish
  if (action.type === "dataReceived")
    return { ...state, status: "ready", questions: action.payload };
  //! when error occur while fetching data
  if (action.type === "dataFailed") return { ...state, status: "error" };
  //! when user starts game
  if (action.type === "start") return { ...state, status: "active" };
  //! when user made a choice
  if (action.type === "newAnswer") {
    const question = state.questions[state.index];
    console.log(question.correctOption, state.answer);
    return {
      ...state,
      answer: action.payload,
      points:
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
    };
  }
  if (action.type === "newQuestion")
    return { ...state, index: state.index + 1, answer: null };
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => {
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            {answer !== null ? (
              <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "newQuestion" })}
              >
                Next
              </button>
            ) : (
              ""
            )}
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
