import "./Title.scss";
import Feedback from "./buttons/Feedback.tsx";
import {useHotkeys} from "react-hotkeys-hook";
import {animate} from "framer-motion";

function Title({value, type}) {
    return (
        <div id={"title"}>
            <p>{value} {type === "question" ? "?" : ""}</p>
        </div>
    );
}

export default Title;