import "./Key.scss";

type Props = {
    type?: string
    letter: string,
    description: string
}

function Key(props: Props) {
    return (
        <div className={"key-wrapper"}>
            <span className={`key ${props.type}`}>
                {props.letter}
            </span>
            <span className={"description"}>
                {props.description}
            </span>
        </div>
    );
}

export default Key;