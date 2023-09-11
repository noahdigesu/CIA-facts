import "./Arrow.scss";

import {ArrowLeft, ArrowRight} from 'react-feather';
import {animate, motion} from "framer-motion";
import {useHotkeys} from "react-hotkeys-hook";
import Key from "../Key.tsx";

function Arrow({direction}) {
    useHotkeys('d', () => animateArrow("right"));
    useHotkeys('a', () => animateArrow("left"));

    function animateArrow(direction) {
        animate(
            `#arrow_${direction}`,
            {x: [10, 0]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <div className={`arrow-wrapper ${direction}`}>
            <motion.span className={`arrow`}
                         onMouseDown={() => animateArrow(direction)}>
                {direction === "left" ? (
                    <ArrowLeft id={"arrow_left"}/>
                ) : <ArrowRight id={"arrow_right"}/>}
            </motion.span>
            <Key letter={direction === "left"? "a" : "d"}/>
        </div>
    );
}

export default Arrow;