import React from 'react';
import { FaCirclePlay } from "react-icons/fa6";

import { PropsSong } from "@interfaces/index";
import DropdownMenu from "../DropdownMenu";

export default function CardSong (props: PropsSong){
    const { data } = props;

    return (
        <div
            className="card-album group relative p-3 flex-shrink-0 max-w-fit rounded-lg transition duration-300 hover:bg-gray-800 cursor-pointer">
            <div className="relative w-36 h-36">
                <img
                    alt="name"
                    src={data?.picture}
                    className="w-36 h-36 rounded-xl object-cover"
                    loading="lazy"
                />
                <button
                    className="rounded-xl absolute bottom-0 right-0 hidden group-hover:block transition duration-800"
                >
                    {FaCirclePlay({
                        className: "text-5xl transition duration-800",
                        style: {fill: "url(#second-gradient)"}
                    })}
                </button>
            </div>
            <div className="mt-3 flex flex-column gap-2 text-left max-w-40">
                <div className="flex justify-content-between items-center max-w-full">
                    <a className="max-w-32 inline-block truncate">
                        <span className="font-semibold">{data?.title}</span>
                    </a>
                    <DropdownMenu/>
                </div>
                <span className="text-xs">{data?.artist?.name}</span>
            </div>
        </div>
    )
}