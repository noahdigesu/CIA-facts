import "./Counter.scss";

type Props = {
    questionNumber: number,
    questionAmount: number
}

function Counter(props: Props) {
    return (
        <p id={"counter"} style={{color: "white"}}>{props.questionNumber} / {props.questionAmount}</p>
    )
}

export default Counter;