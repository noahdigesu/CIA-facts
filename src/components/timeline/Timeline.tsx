import "./Timeline.scss";
import CheckPoint from "./CheckPoint.tsx";
import {STATE, TAG} from "../../constants/constants.tsx";

type Props = {
    questions: object[],
    currentQuestion: number,
    failedQuestions: number[],
    passedQuestions: number[],
    starredQuestions: number[]
}

function Timeline(props: Props) {
    return (
        <div id={"timeline"}>
            <div id={"line"}/>
                {props.questions.map((_question: unknown, i: number) => {
                    const state: STATE = (i === props.currentQuestion ? STATE.current : i === props.currentQuestion - 1 ? STATE.previous : STATE.normal);
                    const tag: TAG = (props.starredQuestions.includes(i) ? TAG.starred : props.passedQuestions.includes(i) ? TAG.passed : props.failedQuestions.includes(i) ? TAG.failed : TAG.incomplete);

                    return <span key={i}>
                        <CheckPoint
                            state={state}
                            tag={tag}
                        />
                    </span>
                }
            )}
        </div>
    );
}

export default Timeline;