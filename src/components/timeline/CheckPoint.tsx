import "./CheckPoint.scss";
import {STATE, TAG} from "../../constants/constants.tsx";

type Props = {
    state: STATE,
    tag: TAG,
    previousDate: string
}

function CheckPoint(props: Props) {
    return (
        <div className={"checkpoint-wrapper"}>
            <span className={`checkpoint ${props.state} ${props.tag}`}/>
            {props.state == "previous" ? <p className={`date ${props.state} ${props.tag}`}>{props.previousDate}</p> : <></>}
        </div>
    );
}

export default CheckPoint;