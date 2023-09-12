import "./Keymap.scss";
import Key from "./Key.tsx";
import KeyCategory from "./KeyCategory.tsx";

function Keymap() {
    return (
        <div id={"keymap"}>
            <KeyCategory name={"Movements"}/>
            <div className={"keys"}>
                <Key letter={"a"} description={"Go to the previous question"}/>
                <Key letter={"d"} description={"Go to the next question"}/>
                <Key type={"long"} letter={"start"} description={"Go to the first question"}/>
                <Key type={"long"} letter={"end"} description={"Go to the last question"}/>
            </div>

            <KeyCategory name={"Tagging"}/>
            <div className={"keys"}>
                <Key letter={"q"} description={"Mark current question as failed"}/>
                <Key letter={"e"} description={"Mark current question as passed"}/>
                <Key letter={"s"} description={"Mark current question as starred"}/>
                <Key type={"long"} letter={"ctrl + r"} description={"Reset all tags"}/>
            </div>

            <KeyCategory name={"Filters"}/>
            <div className={"keys"}>
                <Key type={"long"} letter={"ctrl + s"} description={"Only show starred questions"}/>
                <Key type={"long"} letter={"ctrl + f"} description={"Only show failed questions"}/>
            </div>
        </div>
    );
}

export default Keymap;