import React from 'react';
import partySNSD from "../../assets/images/snsd/party.jpg";

export default function CardAlbum (){
    return (
    <div className="card-album p-3 block flex-shrink-0 max-w-fit">
        <a href="#" className="block relative">
            <img
                alt="name"
                src={partySNSD}
                className="w-36 h-36 rounded-xl"/>
        </a>
        <div className="mt-3 flex flex-column gap-2 text-left max-w-40">
            <a className="max-w-32 inline-block truncate">
                <span className="font-semibold">I GOT A BOY dadaddad</span>
            </a>
            <a className="max-w-32 inline-block truncate">
                <span className="text-xs">SNSD</span>
            </a>
        </div>
    </div>

    )
}