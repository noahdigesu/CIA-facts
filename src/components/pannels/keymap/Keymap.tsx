import "./Keymap.scss";
import Key from "./Key.tsx";
import KeyCategory from "./KeyCategory.tsx";

function Keymap() {
    return (
        <div id={"keymap"}>
            <KeyCategory name={"Movements"}/>
            <div className={"keys"}>
                <Key letter={"a"} description={"Go to previous question"}/>
                <Key letter={"d"} description={"Go to next question"}/>
                <Key type={"long"} letter={"start"} description={"Go to first question"}/>
                <Key type={"long"} letter={"end"} description={"Go to last question"}/>
            </div>

            <KeyCategory name={"Tagging"}/>
            <div className={"keys"}>
                <Key letter={"q"} description={"Mark current question as failed"}/>
                <Key letter={"e"} description={"Mark current question as passed"}/>
                <Key letter={"s"} description={"Star current question"}/>
                <Key type={"long"} letter={"ctrl + r"} description={"Reset"}/>
            </div>

            <KeyCategory name={"Filters"}/>
            <div className={"keys"}>
                <Key type={"long"} letter={"ctrl + s"} description={"Only show starred"}/>
                <Key type={"long"} letter={"ctrl + f"} description={"Only show failed"}/>
            </div>
        </div>
    );
}

export default Keymap;