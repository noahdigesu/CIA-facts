import "./Arrow.scss";

import {ArrowRight, ArrowLeft} from 'react-feather';

function Arrow({direction}) {
    return (
        <span className={`arrow ${direction}`}>
            {direction === "left" ? (
                <ArrowLeft/>
            ) : <ArrowRight/>}
        </span>
    );
}

export default Arrow;