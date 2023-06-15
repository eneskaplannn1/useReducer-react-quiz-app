import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./utilits/Loader";
import Error from "./utilits/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = { questions: [], status: "loading", index: 0 };

function reducer(state, action) {
  if (action.type === "loading") return { ...state, status: "loading" };
  if (action.type === "dataReceived")
    return { ...state, status: "ready", questions: action.payload };
  if (action.type === "dataFailed") return { ...state, status: "error" };
  // if (action.type === "active") return { ...state, status: "active" };
  if (action.type === "start") return { ...state, status: "active" };
  // if (action.type === "finished") return { ...state, status: "finished" };
  //loading , error ,ready ,active,finished
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuentions = questions.length;

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => {
        console.log(err);
        dispatch({ status: "dataFailed" });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuentions={numQuentions} dispatch={dispatch} />
        )}
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}

export default App;
