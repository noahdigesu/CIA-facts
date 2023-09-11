import "./Key.scss";

function Key({letter}) {
    return (
        <span className={"key"}>
            {letter}
        </span>
    );
}

export default Key;