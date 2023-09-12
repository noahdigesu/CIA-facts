import "./Feedback.scss";
import Key from "../Key.tsx";
import {animate} from "framer-motion";
import {useHotkeys} from "react-hotkeys-hook";

type Props = {
    type: string,
    enabled: boolean
}

function Feedback(props: Props) {
    useHotkeys('q', () => animateCross());
    useHotkeys('e', () => animateCheckMark());
    // Uncaught Error: No valid element provided. when deselecting
    // useHotkeys(props.type === "check" ? 'e' : 'q', () => animateCheck());

    function animateCross() {
        animate(
            ".checkmark-wrapper.cross .checkmark",
            {scale: [.8, 1]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    function animateCheckMark() {
        animate(
            ".checkmark-wrapper.check .checkmark",
            {scale: [.8, 1]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <div className={`checkmark-wrapper ${props.type}`}
             onClick={() => {
                 animate(
                     `.checkmark-wrapper.${props.type} .checkmark`,
                     {scale: [.8, 1]},
                     {type: "spring", mass: .5, duration: 1}
                 );
             }}>
            <span className={`checkmark ${props.enabled ? "enabled" : ""}`}>
                {props.type === "check" ? "✅" : "❌"}
            </span>
            <Key letter={props.type === "check" ? "e" : "q"}/>
        </div>
    );
}

export default Feedback;