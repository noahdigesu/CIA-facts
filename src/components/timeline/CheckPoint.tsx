import "./CheckPoint.scss";
import {STATE, TAG} from "../../constants/constants.tsx";

type Props = {
    state: STATE,
    tag: TAG
}

function CheckPoint(props: Props) {
    return (
        <span className={`checkpoint ${props.state} ${props.tag}`}>
        </span>
    );
}

export default CheckPoint;