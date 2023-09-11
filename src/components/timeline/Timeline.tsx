import "./Timeline.scss";
import CheckPoint from "./CheckPoint.tsx";

function Timeline({questions, currentQuestion, failedQuestions, passedQuestions, starredQuestions}) {
    return (
        <div id={"timeline"}>
            {questions.map((question, i) =>
                <span key={i}>
                    <CheckPoint
                        state={i === currentQuestion ? "current" : i === currentQuestion - 1 ? "previous" : "normal"}
                        tag={starredQuestions.includes(i) ? "starred" : passedQuestions.includes(i) ? "passed" : failedQuestions.includes(i) ? "failed" : "incomplete"}
                    />
                </span>
            )}
        </div>
    );
}

export default Timeline;