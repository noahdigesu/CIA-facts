import "./Feedback.scss";

function Feedback({type, enabled}) {
    return (
        <span className={`checkmark ${enabled ? "enabled" : ""}`}>
            {type === "check" ? "✅" : "❌"}
        </span>
    );
}

export default Feedback;