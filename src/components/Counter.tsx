import "./Counter.scss";

function Counter({questionNumber, questionAmount}) {
    return (
        <p id={"counter"} style={{color: "white"}}>{questionNumber} / {questionAmount}</p>
    )
}

export default Counter;