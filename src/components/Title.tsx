import "./Title.scss";

import {QUESTION_TYPE} from "../constants/constants.tsx";

type Props = {
    value: string,
    type: string
}

function Title(props: Props) {
    return (
        <div id={"title"}>
            <p>{props.value} {props.type === QUESTION_TYPE.question ? "?" : ""}</p>
        </div>
    );
}

export default Title;