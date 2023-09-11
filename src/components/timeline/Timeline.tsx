import "./Timeline.scss";
import CheckPoint from "./CheckPoint.tsx";

function Timeline({questions, currentQuestion, failedQuestions, passedQuestions, starredQuestions}) {
    return (
        <div id={"timeline"}>
            {questions.map((question, i) =>
                <span key={i}>
                    <CheckPoint question={question}
                                state={i === currentQuestion ? "current" : i === currentQuestion - 1 ? "previous" : "normal"}
                                tag={passedQuestions.includes(i) ? "passed" : failedQuestions.includes(i) ? "failed" : starredQuestions.includes(i) ? "starred" : "incomplete"}
                    />
                </span>
            )}
        </div>
    );
}

export default Timeline;