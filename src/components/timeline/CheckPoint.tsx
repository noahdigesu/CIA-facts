import "./CheckPoint.scss";
import {STATE, TAG} from "../../constants/constants.tsx";
import {Check} from "react-feather";

type Props = {
    state: STATE,
    tag: TAG,
    previousDate: string,
    isLast: boolean,
    isCurrent: boolean,
    gradientColor: string
}

function CheckPoint(props: Props) {
    return (
        <div className={"checkpoint-wrapper"}>
            <span className={`checkpoint ${props.state} ${props.tag} ${props.isLast ? "checkmark" : ""}`}>
                {props.isLast ? <Check/> : ""}
            </span>
            {props.isCurrent ?
                <div className={"highlight"}
                     style={{background: `linear-gradient(-270deg, rgba(0, 0, 0, 0) 25%, ${props.gradientColor} 100%)`}}/>
                : ""}
            {props.state == "previous" ?
                <p className={`date ${props.state} ${props.tag}`}>{props.previousDate}</p> : <></>}
        </div>
    );
}

export default CheckPoint;