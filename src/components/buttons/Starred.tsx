import "./Starred.scss";
import {animate, motion} from "framer-motion";
import {useHotkeys} from 'react-hotkeys-hook';

import {Star} from 'react-feather';

function Starred({toggled}) {
    useHotkeys('s', () => animateStar());

    const animateStar = () => {
        animate(
            "#star",
            {scale: [.8, 1]},
            {type: "spring", mass: .5 , duration: 1}
        );
    }

    return (
        <motion.span id={"star"} onMouseDown={animateStar}>
            <Star className={toggled ? "toggled" : ""}/>
        </motion.span>
    );
}

export default Starred;