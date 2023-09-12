import "./Feedback.scss";
import {animate} from "framer-motion";
import {useHotkeys} from "react-hotkeys-hook";

type Props = {
    type: string,
    enabled: boolean
}

function Feedback(props: Props) {
    useHotkeys('q', () => animateFeedback("cross"));
    useHotkeys('e', () => animateFeedback("check"));

    function animateFeedback(type: string) {
        animate(
            `.checkmark-wrapper.${type} .checkmark`,
            {scale: [.8, 1]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <div className={`checkmark-wrapper ${props.type}`}
             onClick={() => animateFeedback(props.type)}>
            <span className={`checkmark ${props.enabled ? "enabled" : ""}`}>
                {props.type === "check" ? "✅" : "❌"}
            </span>
        </div>
    );
}

export default Feedback;