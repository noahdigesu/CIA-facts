import "./Key.scss";
import {useHotkeys} from "react-hotkeys-hook";
import {animate} from "framer-motion";

type Props = {
    type?: string,
    letter: string,
    description?: string,
}

function Key(props: Props) {
    useHotkeys(props.letter,
        (e) => {
            animateKey(e.key, e.shiftKey);
        },
        {preventDefault: true}
    );

    function sanitizeLetter(letter: string) {
        return letter.replace(" + ", "_").trim().toLowerCase();
    }

    function animateKey(key: string, shift: boolean = false) {
        key = sanitizeLetter(key);
        if (shift) key = "shift_" + key;

        animate(
            `.key.${key}`,
            {
                scale: [.8, 1],
                backgroundColor: ["#fff", "#000"],
                color: ["#000", "#fff"]
            },
            {
                type: "spring",
                mass: .5,
                duration: 1
            }
        );
    }

    return (
        <div className={"key-wrapper"} onClick={() => animateKey(sanitizeLetter(props.letter))}>
            <span className={`key ${props.type} ${sanitizeLetter(props.letter)}`}>
                {props.letter}
            </span>
            <span className={"description"}>
                {props.description}
            </span>
        </div>
    );
}

export default Key;