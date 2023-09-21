import KeyCategory from "../keymap/KeyCategory.tsx";
import Key from "../keymap/Key.tsx";

import {useHotkeys} from "react-hotkeys-hook";

type Props = {
    toggle: () => void,
}

function Deck(props: Props) {
    useHotkeys('m', () => props.toggle());

    return (
        <>
            <KeyCategory name={"Deck of questions"}/>
            <div className={"keys"}>
                <Key letter={"1"} description={"Default"}/>
                <Key letter={"2"} description={"OSes"}/>
                <Key letter={"3"} description={"Web"}/>
            </div>
        </>
    );
}

export default Deck;