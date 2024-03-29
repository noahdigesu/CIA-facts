import Key from "./Key.tsx";
import KeyCategory from "./KeyCategory.tsx";

import {useHotkeys} from "react-hotkeys-hook";

type Props = {
    toggle: () => void,
}

function Keymap(props: Props) {
    useHotkeys('h', () => props.toggle());

    return (
        <>
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
                <Key type={"long"} letter={"shift + c"} description={"Only show passed questions"}/>
            </div>
        </>
    );
}

export default Keymap;