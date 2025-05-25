import React from 'react';
import { useNavigate } from "react-router-dom";

import { PropsArtist } from "@interfaces/index";

export default function CardArtist (props: PropsArtist){
    const { data } = props;
    const nav = useNavigate();

    return (
        <div className="card-artist p-3 block flex-shrink-0"
            onClick={() => nav(`/detail-artist/${data.artist_id}`)}
        >
            <img
                alt="name"
                src={data?.picture}
                className="w-36 h-36 rounded-full"
                loading="lazy"
            />
            <div className="mt-3 text-center">
                <span className="font-semibold">{data?.name}</span>
            </div>
        </div>
    )
}