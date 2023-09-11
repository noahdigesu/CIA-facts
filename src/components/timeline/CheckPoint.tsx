import "./CheckPoint.scss";

function CheckPoint({
                        state = "normal" | "previous" | "current",
                        tag = "incomplete" | "passed" | "failed" | "starred"
                    }) {
    return (
        <span className={`checkpoint ${state} ${tag}`}>
        </span>
    );
}

export default CheckPoint;