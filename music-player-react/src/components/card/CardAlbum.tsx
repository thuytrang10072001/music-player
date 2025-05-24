import React from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { PropsAlbum } from "@interfaces/index";

export default function CardAlbum (props: PropsAlbum){
    const { data } = props;
    const nav = useNavigate();

    return (
        <div
            className="card-album group relative p-3 flex-shrink-0 max-w-fit rounded-lg transition duration-300 hover:bg-gray-800 cursor-pointer"
            onClick={() => nav(`/detail-album/${data.album_id}`)}
        >
            <div className="relative w-36 h-36">
                <img
                    alt="name"
                    src={data?.picture}
                    className="w-36 h-36 rounded-xl object-cover"
                />
                <button
                    className="rounded-xl absolute bottom-0 right-0 hidden group-hover:block transition duration-800"
                >
                    {FaCirclePlay({
                        className: "text-5xl transition duration-800",
                        style: {fill: "url(#second-gradient)"}
                    })}
                    {/*<FaCirclePlay className="text-5xl transition duration-800" style={{ fill: "url(#second-gradient)"}}/>*/}
                </button>
            </div>

            <div className="mt-3 flex flex-col gap-2 text-left max-w-40">
                <a className="max-w-32 inline-block truncate" title={data?.title}>
                    <span className="font-semibold text-white">{data?.title}</span>
                </a>
                {data?.artist?.name !== '' ?
                    <a className="max-w-32 inline-block truncate" title={data?.artist?.name}>
                        <span className="text-xs text-gray-400">{data?.artist?.name}</span>
                    </a> : ('')
                }
            </div>
        </div>

    )
}