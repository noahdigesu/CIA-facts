import "./Title.scss";

import {QUESTION_TYPE} from "../constants/constants.tsx";
import {Question} from "../types/types.tsx";

type Props = {
    question: Question,
    type: QUESTION_TYPE
}

function Title(props: Props) {
    return (
        <div id="title">
            {props.type === QUESTION_TYPE.question ? (
                <p>{props.question.question + "?"}</p>
            ) : <div>{props.question.answer}
                {props.question.author && <p id="author">{props.question.author}</p>}
                {props.question.picture &&
                    <img id="picture" src={props.question.picture} alt={props.question.author}/>}
            </div>}
        </div>
    );
}

export default Title;