import React from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentSong } from '../../store/MusicPlayerSlice';

import { PropsSong, Song} from "@interfaces/index";
import { useAudio } from "../../hooks/AudioContext";
import DropdownMenu from "../DropdownMenu";

export default function CardSong (props: PropsSong){
    const  { data } = props;
    const dispatch = useDispatch();
    const { play } = useAudio();
    const handlePlay = () => {
        dispatch(setCurrentSong(data));
        play();
    }

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
                    onClick={handlePlay}
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
                    <DropdownMenu data={data}/>
                </div>
                    {data.artists.map((item, index) => (
                        <span className="text-xs">
                            {item.name}
                            {index !== data.artists.length - 1 ? ', ' : ''}
                        </span>
                        ))
                    }
                </div>
        </div>
    )
}