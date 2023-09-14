import "./CheckPoint.scss";
import {STATE, TAG} from "../../constants/constants.tsx";

type Props = {
    state: STATE,
    tag: TAG,
    previousDate: string,
    isLast: boolean,
    isCurrent: boolean,
}

function CheckPoint(props: Props) {
    const gradientColor: string = props.tag === TAG.starred ? "#FFE073"
        : props.tag === TAG.passed ? "#13F287"
            : props.tag === TAG.failed ? "#FF4D4D" : "#FFFFFF";

    return (
        <div className={"checkpoint-wrapper"}>
            <span className={`checkpoint ${props.state} ${props.tag}`}/>
            {props.isCurrent ?
                <div className={"highlight"}
                     style={{background: `linear-gradient(-270deg, rgba(0, 0, 0, 0) 25%, ${gradientColor} 100%)`}}/>
                : <></>}
            {props.state == "previous" ?
                <p className={`date ${props.state} ${props.tag}`}>{props.previousDate}</p> : <></>}
        </div>
    );
}

export default CheckPoint;