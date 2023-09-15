import "./Deck.scss";
import KeyCategory from "../keymap/KeyCategory.tsx";
import Key from "../keymap/Key.tsx";
import {animate, motion} from "framer-motion";
import {useHotkeys} from "react-hotkeys-hook";

type Props = {
    toggled: boolean
}

function Deck(props: Props) {
    useHotkeys('m', () => togglePanel());
    useHotkeys('esc', () => close());

    function close() {
        if (props.toggled) animateOut();
    }

    function animateIn() {
        animate(
            "#deck-wrapper",
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
            "#deck",
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
            "#deck-wrapper",
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

    function togglePanel() {
        !props.toggled ? animateIn() : animateOut();
    }

    return (
        <motion.div id={"deck-wrapper"} initial={{display: "none"}} exit={{display: "none"}}>
            <div id={"deck"}>
                <KeyCategory name={"Deck of questions"}/>
                <div className={"keys"}>
                    <Key letter={"1"} description={"Default"}/>
                    <Key letter={"2"} description={"OSes"}/>
                    <Key letter={"3"} description={"Web"}/>
                </div>
            </div>
        </motion.div>
    );
}

export default Deck;