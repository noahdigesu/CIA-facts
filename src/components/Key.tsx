import "./Key.scss";

type Props = {
    letter: string
}

function Key(props: Props) {
    return (
        <span className={"key"}>
            {props.letter}
        </span>
    );
}

export default Key;