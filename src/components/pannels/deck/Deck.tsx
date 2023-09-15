import "./Deck.scss";
import KeyCategory from "../keymap/KeyCategory.tsx";
import Key from "../keymap/Key.tsx";

function Deck() {
    return (
        <div id={"deck"}>
            <KeyCategory name={"Question decks"}/>
            <div className={"keys"}>
                <Key letter={"1"} description={"Default"}/>
                <Key letter={"2"} description={"OSes"}/>
                <Key letter={"3"} description={"Web"}/>
            </div>
        </div>
    );
}

export default Deck;