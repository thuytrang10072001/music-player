import React from 'react';

export default function CardAlbum (props){
    const { data } = props;

    return (
    <div className="card-album p-3 block flex-shrink-0 max-w-fit">
        <a href="#" className="block relative">
            <img
                alt="name"
                src={data?.picture}
                className="w-36 h-36 rounded-xl"/>
        </a>
        <div className="mt-3 flex flex-column gap-2 text-left max-w-40">
            <a className="max-w-32 inline-block truncate" title={data?.title}>
                <span className="font-semibold">{data?.title}</span>
            </a>
            <a className="max-w-32 inline-block truncate" title={data?.artist?.name}>
                <span className="text-xs">{data?.artist?.name}</span>
            </a>
        </div>
    </div>

    )
}