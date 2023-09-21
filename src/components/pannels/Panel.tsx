import "./Panel.scss";
import {useHotkeys} from "react-hotkeys-hook";
import {animate, motion} from "framer-motion";
import Keymap from "./keymap/Keymap.tsx";
import Deck from "./deck/Deck.tsx";

type Props = {
    toggled: boolean,
    setToggled: (toggled: boolean) => void,
    type: "keymap" | "deck"
}

function Panel(props: Props) {
    useHotkeys('esc', () => close());

    function togglePanel() {
        !props.toggled ? animateIn() : animateOut();
        props.setToggled(!props.toggled);
    }

    function close() {
        if (props.toggled) {
            animateOut();
            props.setToggled(false);
        }
    }

    function animateIn() {
        animate(
            `#${props.type}-wrapper`,
            {
                display: "inherit",
                opacity: [0, 1]
            },
            {
                type: "spring",
                mass: .5,
                duration: 1
            }
        );
        animate(
            `#${props.type}`,
            {
                transform: ["translate3d(-50%, -45%, 0)", "translate3d(-50%, -50%, 0)"]
            },
            {
                type: "spring",
                mass: .5,
                duration: 1
            }
        );
    }

    function animateOut() {
        animate(
            `#${props.type}-wrapper`,
            {
                opacity: [1, 0],
                display: "none"
            },
            {
                type: "spring",
                mass: .5,
                duration: 1
            }
        );
    }

    return (
        <motion.div id={`${props.type}-wrapper`} initial={{display: "none"}}>
            <div className={`panel`} id={props.type}>
                {props.type === "keymap"
                    && <Keymap toggle={togglePanel}/>}
                {props.type === "deck"
                    && <Deck toggle={togglePanel}/>}
            </div>
        </motion.div>
    );
}

export default Panel;