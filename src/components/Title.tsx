import "./Title.scss";

function Title({value, type}) {
    return (<p>{value} {type === "question" ? "?" : ""}</p>);
}

export default Title;