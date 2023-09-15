import "./Action.scss";
import {animate, motion} from "framer-motion";
import {useHotkeys} from 'react-hotkeys-hook';
import {Bookmark, Check, Star, X} from 'react-feather';

type Props = {
    toggled: boolean,
    icon: "bookmark" | "star" | "cross" | "check",
    hotkey: string
}

function Action(props: Props) {
    useHotkeys(props.hotkey, () => animateAction());

    const animateAction = () => {
        animate(
            `#${props.icon}-action-wrapper`,
            {scale: [.8, 1]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <span className={`action-wrapper`} id={`${props.icon}-action-wrapper`}>
            <motion.span className={`${props.icon} action ${props.toggled ? "toggled" : ""}`}
                         onMouseDown={animateAction}>
                {props.icon === "star"
                    ? <Star/>
                    : <></>}
                {props.icon === "bookmark"
                    ? <Bookmark/>
                    : <></>}
                {props.icon === "cross"
                    ? <X/>
                    : <></>}
                {props.icon === "check"
                    ? <Check/>
                    : <></>}
            </motion.span>
        </span>
    );
}

export default Action;