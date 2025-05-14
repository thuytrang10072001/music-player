import React from 'react';

interface Props {
    data: {
        picture: string,
        name: string,
    }
}

export default function CardArtist (props: Props){
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