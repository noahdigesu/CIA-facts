import "./Arrow.scss";

import {ArrowLeft, ArrowRight} from 'react-feather';
import {animate, motion} from "framer-motion";
import {useHotkeys} from "react-hotkeys-hook";
import {DIRECTION} from "../../constants/constants.tsx";

type Props = {
    direction: DIRECTION
}

function Arrow(props: Props) {
    useHotkeys('d', () => animateArrow(DIRECTION.next));
    useHotkeys('a', () => animateArrow(DIRECTION.previous));

    function animateArrow(direction: DIRECTION) {
        animate(
            `#arrow_${direction}`,
            {x: [10, 0]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <div className={`arrow-wrapper ${props.direction}`}>
            <motion.span className={`arrow`}
                         onMouseDown={() => animateArrow(props.direction)}>
                {props.direction === DIRECTION.previous ? (
                    <ArrowLeft id={"arrow_previous"}/>
                ) : <ArrowRight id={"arrow_next"}/>}
            </motion.span>
        </div>
    );
}

export default Arrow;