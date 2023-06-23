import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
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
  if (action.type === "finished")
    return {
      ...state,
      status: "finish",
      highscore:
        state.highscore < state.points ? state.points : state.highscore,
    };
  if (action.type === "tick") {
    return {
      ...state,
      secondsRemaining: state.secondsRemaining - 1,
      status: state.secondsRemaining < 1 ? "finish" : state.status,
    };
  }
  if (action.type === "restart")
    return {
      ...initialState,
      questions: state.questions,
      highscore: state.highscore,
      status: "ready",
    };
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
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
    <QuizContext.Provider
      value={{
        questions,
        question: questions[index],
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("Use useQuiz custom hook inside provider");
  return context;
}

export { QuizProvider, useQuiz };
