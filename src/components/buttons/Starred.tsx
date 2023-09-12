import "./Starred.scss";
import {animate, motion} from "framer-motion";
import {useHotkeys} from 'react-hotkeys-hook';
import {Star} from 'react-feather';

import Key from "../Key.tsx";

type Props = {
    toggled: boolean
}

function Starred(props: Props) {
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
                <Star className={props.toggled ? "toggled" : ""}/>
            </motion.span>
            <Key letter={"s"}/>
        </span>
    );
}

export default Starred;