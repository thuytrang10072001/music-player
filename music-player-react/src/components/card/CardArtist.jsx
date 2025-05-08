import React from 'react';

export default function CardArtist (props){
    const { data } = props;

    return (
        <div className="card-artist p-3 block flex-shrink-0">
            <a href="#" className="block relative">
                <img
                    alt="name"
                    src={data?.picture}
                    className="w-36 h-36 rounded-full"/>
            </a>
            <div className="mt-3 text-center">
                <span className="font-semibold">{data?.name}</span>
            </div>
        </div>
    )
}