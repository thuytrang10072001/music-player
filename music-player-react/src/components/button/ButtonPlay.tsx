import {FaCirclePlay} from "react-icons/fa6";
import React from "react";

export default function ButtonPlay(){
    return (
        <button
            className="rounded-xl"
        >
            {FaCirclePlay({
                className: "text-5xl",
                style: {fill: "url(#second-gradient)"}
            })}
        </button>

    )
}