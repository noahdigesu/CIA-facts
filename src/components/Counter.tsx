import "./Counter.scss";
import questions from "../../public/q-a.json";

function Counter({questionNumber, questionAmount}) {
    return (
        <p id={"counter"} style={{color: "white"}}>{questionNumber} / {questionAmount}</p>
    )
}

export default Counter;