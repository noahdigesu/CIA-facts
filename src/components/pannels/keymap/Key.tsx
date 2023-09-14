import "./Key.scss";
import {useHotkeys} from "react-hotkeys-hook";
import {animate} from "framer-motion";

type Props = {
    type?: string,
    textPlacement?: string,
    letter: string,
    description: string
}

function Key(props: Props) {
    const letter = props.letter.replace(" + ", "_").trim();

    useHotkeys(props.letter,
        (e) => {
            console.log(e);
            if (e.shiftKey) {
                animateKey(`shift_${e.key.toLowerCase()}`);
            } else {
                animateKey(e.key.toLowerCase())
            }
        },
        {preventDefault: true}
    );

    function animateKey(key: string) {
        console.log(`.key.${key}`);
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
            })
    }

    return (
        <div className={"key-wrapper"} style={{flexDirection: props.textPlacement === "left" ? "row-reverse" : "row"}}>
            <span className={`key ${props.type} ${letter}`}>
                {props.letter}
            </span>
            <span className={"description"}>
                {props.description}
            </span>
        </div>
    );
}

export default Key;