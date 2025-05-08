import React from 'react';

import DropdownMenu from "../DropdownMenu";


export default function CardSong (props){
    const { data } = props;

    return (
        <div className="card-album p-3 block flex-shrink-0 text-center max-w-fit">
            <a href="#" className="block relative">
                <img
                    alt="name"
                    src={data?.picture}
                    className="w-36 h-36 rounded-xl"/>
            </a>
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