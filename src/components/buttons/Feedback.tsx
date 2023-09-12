import "./Feedback.scss";
import {useHotkeys} from "react-hotkeys-hook";
import {animate} from "framer-motion";
import Key from "../Key.tsx";

type Props = {
    type: string,
    enabled: boolean
}

function Feedback(props: Props)  {
    useHotkeys(props.type === "check" ? 'e' : 'q', () => animateCheck());

    // Todo: fix animations
    const animateCheck = () => {
        animate(
            ".enabled",
            {scale: [.8, 1]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <div className={`checkmark-wrapper ${props.type}`}>
            <span onMouseDown={animateCheck} className={`checkmark ${props.enabled ? "enabled" : ""}`}>
                {props.type === "check" ? "✅" : "❌"}
            </span>
            <Key letter={props.type === "check" ? "e" : "q"}/>
        </div>
    );
}

export default Feedback;