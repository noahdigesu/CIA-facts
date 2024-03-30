import "./Arrow.scss";
import {animate, motion} from "framer-motion";
import {useHotkeys} from "react-hotkeys-hook";
import {DIRECTION} from "../../constants/constants.tsx";
import {ReactNode} from "react";

type Props = {
    direction: DIRECTION,
    onMouseDown: () => void,
    children?: ReactNode
}

function Arrow(props: Props) {
    useHotkeys('ArrowRight', () => animateArrow(DIRECTION.next));
    useHotkeys('ArrowLeft', () => animateArrow(DIRECTION.previous));

    function animateArrow(direction: DIRECTION) {
        // todo check if arrow exists
        // Uncaught Error: No valid element provided.
        //     at invariant (errors.mjs:13:19)
        // at animateElements (animate.mjs:15:5)
        // at scopedAnimate (animate.mjs:69:25)
        // at animateArrow (Arrow.tsx?t=1694553248666:28:5)
        // at Object.current (Arrow.tsx?t=1694553248666:25:25)
        // at useHotkeys.ts:104:17
        // at Array.forEach (<anonymous>)
        //     at listener2 (useHotkeys.ts:87:60)
        //     at HTMLDocument.handleKeyDown2 (useHotkeys.ts:122:9)
        // todo happens when first question is reached and try to go to previous, same with last
        animate(
            `#arrow_${direction}`,
            {x: [10, 0]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <div className={`arrow-wrapper ${props.direction}`} onMouseDown={props.onMouseDown}>
            <motion.span className={`arrow`}
                         onMouseDown={() => animateArrow(props.direction)}>
                {props.children}
            </motion.span>
        </div>
    );
}

export default Arrow;