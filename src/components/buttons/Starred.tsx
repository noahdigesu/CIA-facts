import "./Starred.scss";
import {animate, motion} from "framer-motion";

function Starred({toggled}) {
    useHotkeys('s', () => animateStar());

    const animateStar = () => {
        animate(
            "#star",
            {scale: [.8, 1]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <span id={"star-wrapper"}>
            <motion.span id={"star"}
                         onMouseDown={animateStar}>
                <Star className={toggled ? "toggled" : ""}/>
            </motion.span>
            <Key letter={"s"}/>
        </span>
    );
}

import {useHotkeys} from 'react-hotkeys-hook';
import {Star} from 'react-feather';

import Key from "../Key.tsx";

export default Starred;