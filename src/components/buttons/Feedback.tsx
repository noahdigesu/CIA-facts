import "./Feedback.scss";
import {useHotkeys} from "react-hotkeys-hook";
import {animate} from "framer-motion";
import Key from "../Key.tsx";

function Feedback({type, enabled}) {
    useHotkeys(type === "check" ? 'e' : 'q', () => animateCheck());

    // Todo: fix animations
    const animateCheck = () => {
        animate(
            ".enabled",
            {scale: [.8, 1]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <div className={`checkmark-wrapper ${type}`}>
            <span onMouseDown={animateCheck} className={`checkmark ${enabled ? "enabled" : ""}`}>
                {type === "check" ? "✅" : "❌"}
            </span>
            <Key letter={type === "check" ? "e" : "q"}/>
        </div>
    );
}

export default Feedback;