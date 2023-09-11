import "./Arrow.scss";

import {ArrowLeft, ArrowRight} from 'react-feather';
import {motion} from "framer-motion";

function Arrow({direction}) {

    return (
        <motion.span className={`arrow ${direction}`}>
            {direction === "left" ? (
                <ArrowLeft/>
            ) : <ArrowRight/>}
        </motion.span>
    );
}

export default Arrow;