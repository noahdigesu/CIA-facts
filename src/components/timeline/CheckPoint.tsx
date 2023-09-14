import "./CheckPoint.scss";
import {STATE, TAG} from "../../constants/constants.tsx";
import {Check} from "react-feather";

type Props = {
    state: STATE,
    tag: TAG,
    previousDate: string,
    isLast: boolean
}

function CheckPoint(props: Props) {
    return (
        <div className={"checkpoint-wrapper"}>
            <span className={`checkpoint ${props.state} ${props.tag} ${props.isLast ? "last" : ""}`}>
                {props.isLast ? <Check/> : <></>}
            </span>
            {props.state == "previous" ?
                <p className={`date ${props.state} ${props.tag}`}>{props.previousDate}</p> : <></>}
        </div>
    );
}

export default CheckPoint;