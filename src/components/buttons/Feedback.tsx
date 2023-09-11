import "./Feedback.scss";
import {useHotkeys} from "react-hotkeys-hook";
import {animate} from "framer-motion";

function Feedback({type, enabled}) {
    useHotkeys(type === "check" ? 'e' : 'q', () => animateCheck());

    // Todo: fix animations
    const animateCheck = () => {
        animate(
            ".enabled",
            {scale: [.8, 1]},
            {type: "spring", mass: .5 , duration: 1}
        );
    }

    return (
        <span onMouseDown={animateCheck} className={`checkmark ${enabled ? "enabled" : ""}`}>
            {type === "check" ? "✅" : "❌"}
        </span>
    );
}

export default Feedback;