import "./Timeline.scss";
import CheckPoint from "./CheckPoint.tsx";
import {STATE, TAG} from "../../constants/constants.tsx";
import {Question} from "../../types/types.tsx";
import {JSX} from "react/jsx-runtime";

type Props = {
    questions: Question[],
    currentQuestion: number,
    starredQuestions: string[]
    failedQuestions: string[],
    passedQuestions: string[],
}

function Timeline(props: Props) {
    const checkpoints: JSX.Element[] = [];
    {
        props.questions.map((_question: Question, i: number) => {
                const isCurrent = i === props.currentQuestion;
                const isPrevious = i === props.currentQuestion - 1;
                const isPast = i < props.currentQuestion;

                const isStarred = props.starredQuestions.some((id: string) => {
                    return id === _question.id
                });
                const isPassed = props.passedQuestions.some((id: string) =>
                    id === _question.id
                );
                const isFailed = props.failedQuestions.some((id: string) =>
                    id === _question.id
                );

                const state: STATE = (isCurrent ? STATE.current
                    : isPrevious ? STATE.previous
                        : isPast ? STATE.past
                            : STATE.normal);

                const tag: TAG = (isStarred ? TAG.starred
                    : isPassed ? TAG.passed
                        : isFailed ? TAG.failed
                            : TAG.incomplete);

                checkpoints.push((<span key={i}>
                        <CheckPoint
                            state={state}
                            tag={tag}
                            previousDate={props.currentQuestion != 0 ? props.questions[props.currentQuestion - 1].answer : ""}
                            isLast={i === props.questions.length - 1}
                        />
                    </span>));
            }
        );
    }

    // todo refactor map
    return (
        <div id={"timeline"}>
            <div id={"line"}
                 style={{background: `linear-gradient(-270deg, #3B3C3E ${((props.currentQuestion / props.questions.length) * 100) - 10}%, #FFF ${((props.currentQuestion / props.questions.length) * 100) + 10}%, #FFF 100%)`}}/>
            {checkpoints}
        </div>
    );
}

export default Timeline;