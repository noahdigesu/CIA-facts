import "./Action.scss";
import {animate, motion} from "framer-motion";
import {useHotkeys} from 'react-hotkeys-hook';
import {Bookmark, Check, Star, X} from 'react-feather';

type Props = {
    toggled: boolean,
    icon: "bookmark" | "star" | "cross" | "check",
    hotkey: string,
    onMouseDown?: () => void
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

    let icon;
    switch (props.icon) {
        case "star":
            icon = (<Star/>);
            break;
        case "bookmark":
            icon = (<Bookmark/>);
            break;
        case "cross":
            icon = (<X/>);
            break;
        case "check":
            icon = (<Check/>);
            break;
    }

    return (
        <span className={`action-wrapper`} id={`${props.icon}-action-wrapper`} onMouseDown={props.onMouseDown}>
            <motion.span className={`${props.icon} action ${props.toggled ? "toggled" : ""}`}
                         onMouseDown={animateAction}>
                {icon}
            </motion.span>
        </span>
    );
}

export default Action;