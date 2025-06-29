import React from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PropsAlbum } from "@interfaces/index";
import { useAudio } from "../../hooks/AudioContext";
import { playPlaylist } from '../../store/MusicPlayerSlice';

export default function CardAlbum (props: PropsAlbum){
    const { data } = props;
    const { play } = useAudio();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const handlePlayList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(playPlaylist(data))
        play();
    }

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
                    onClick={handlePlayList}
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
                {/*{data?.artists.length ?*/}
                {/*    <a className="max-w-32 inline-block truncate" title="">*/}
                {/*        <span className="text-xs">*/}
                {/*            {data?.artists.map((item, index) => item.name)}*/}
                {/*        </span>*/}
                {/*    </a> : ('')*/}
                {/*}*/}
                {data.artists.map((item, index) => (
                    <span className="text-xs">
                        {item.name}
                        {index !== data.artists.length - 1 ? ', ' : ''}
                    </span>))
                }
            </div>
        </div>

    )
}