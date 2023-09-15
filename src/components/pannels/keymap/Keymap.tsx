import "./Keymap.scss";
import Key from "./Key.tsx";
import KeyCategory from "./KeyCategory.tsx";

import {animate, motion} from "framer-motion";
import {useHotkeys} from "react-hotkeys-hook";

type Props = {
    toggled: boolean
}

function Keymap(props: Props) {
    useHotkeys('h', () => toggleKeymapPanel());

    function toggleKeymapPanel() {
        if (!props.toggled) {
            animate(
                "#keymap-wrapper",
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
                "#keymap",
                {
                    transform: ["translate3d(-50%, -45%, 0)", "translate3d(-50%, -50%, 0)"]
                },
                {
                    type: "spring",
                    mass: .5,
                    duration: 1
                }
            );
        } else {
            animate(
                "#keymap-wrapper",
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
    }

    return (
        <motion.div id={"keymap-wrapper"} initial={{display: "none"}} exit={{display: "none"}}>
            <div id={"keymap"}>
                <KeyCategory name={"Movements"}/>
                <div className={"keys"}>
                    <Key letter={"a"} description={"Go to the previous question"}/>
                    <Key letter={"d"} description={"Go to the next question"}/>
                    <Key type={"long"} letter={"home"} description={"Go to the first question"}/>
                    <Key type={"long"} letter={"end"} description={"Go to the last question"}/>
                </div>

                <KeyCategory name={"Tagging"}/>
                <div className={"keys"}>
                    <Key letter={"f"} description={"Mark current question as failed"}/>
                    <Key letter={"c"} description={"Mark current question as passed"}/>
                    <Key letter={"s"} description={"Mark current question as starred"}/>
                    <Key type={"long"} letter={"shift + r"} description={"Reset all tags"}/>
                </div>

                <KeyCategory name={"Filters"}/>
                <div className={"keys"}>
                    <Key type={"long"} letter={"shift + s"} description={"Only show starred questions"}/>
                    <Key type={"long"} letter={"shift + f"} description={"Only show failed questions"}/>
                </div>
            </div>
        </motion.div>
    );
}

export default Keymap;