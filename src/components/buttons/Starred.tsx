import "./Starred.scss";

import {Star} from 'react-feather';
import {useState} from "react";

function Starred({toggled}) {
    return (
        <span id={"star"}>
            <Star className={toggled ? "toggled" : ""}/>
        </span>
    );
}

export default Starred;