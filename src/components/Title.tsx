import "./Title.scss";
import Feedback from "./buttons/Feedback.tsx";

function Title({value, type}) {
    return (
        <div id={"title"}>
            <p>{value} {type === "question" ? "?" : ""}</p>
        </div>
    );
}

export default Title;