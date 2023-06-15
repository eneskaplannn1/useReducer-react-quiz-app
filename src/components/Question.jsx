function Question({ question }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option) => (
          <btn className="btn btn-option" key={option}>
            {option}
          </btn>
        ))}
      </div>
    </div>
  );
}

export default Question;
