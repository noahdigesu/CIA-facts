import "./Title.scss";

import {QUESTION_TYPE} from "../constants/constants.tsx";
import {Question} from "../types/types.tsx";

type Props = {
    question: Question,
    type: string
}

function Title(props: Props) {
    return (
        <div id={"title"}>
            {props.type === QUESTION_TYPE.question ? (
                <p>{props.question.question + "?"}</p>
            ) : <div>{props.question.answer}
                <p id={"author"}>{props.question.author ? props.question.author : ""}</p>
            </div>}
        </div>
    );
}

export default Title;