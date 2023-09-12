import "./KeyCategory.scss";

type Props = {
    name: string
}

function KeyCategory(props: Props) {
    return (
        <>
            <p className={"key-category"}>{props.name}</p>
            <div className={"separator"}/>
        </>
    )
}

export default KeyCategory;