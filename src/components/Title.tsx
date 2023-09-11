import "./Title.scss";

function Title({value, type}) {
    return (
        <div id={"title"}>
            <p>{value} {type === "question" ? "?" : ""}</p>
        </div>
    );
}

export default Title;