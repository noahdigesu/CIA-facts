import "./Timeline.scss";
import CheckPoint from "./CheckPoint.tsx";
import {STATE, TAG} from "../../constants/constants.tsx";
import {Question} from "../../types/types.tsx";

type Props = {
    questions: Question[],
    currentQuestion: number,
    starredQuestions: Question[]
    failedQuestions: Question[],
    passedQuestions: Question[],
}

function Timeline(props: Props) {
    return (
        <div id={"timeline"}>
            <div id={"line"}
                 style={{background: `linear-gradient(-270deg, #3B3C3E ${((props.currentQuestion / props.questions.length) * 100) - 10}%, #FFF ${((props.currentQuestion / props.questions.length) * 100) + 10}%, #FFF 100%)`}}/>
            {props.questions.map((_question: unknown, i: number) => {
                    const isStarred = props.starredQuestions.some((question: Question) => {
                        return question.question === props.questions[i].question
                            && question.answer === props.questions[i].answer
                    });
                    const isPassed = props.passedQuestions.some((question: Question) => {
                        return question.question === props.questions[i].question
                            && question.answer === props.questions[i].answer
                    });
                    const isFailed = props.failedQuestions.some((question: Question) => {
                        return question.question === props.questions[i].question
                            && question.answer === props.questions[i].answer
                    });

                    const state: STATE = (i === props.currentQuestion ? STATE.current : i === props.currentQuestion - 1 ? STATE.previous : i < props.currentQuestion ? STATE.distant : STATE.normal);
                    const tag: TAG = (isStarred ? TAG.starred : isPassed ? TAG.passed : isFailed ? TAG.failed : TAG.incomplete);

                    return <span key={i}>
                        <CheckPoint
                            state={state}
                            tag={tag}
                            previousDate={props.currentQuestion != 0 ? props.questions[props.currentQuestion - 1].answer : ""}
                            isLast={i === props.questions.length - 1}
                        />
                    </span>
                }
            )}
        </div>
    );
}

export default Timeline;