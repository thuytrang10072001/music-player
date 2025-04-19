import React from 'react';
import partySNSD from "../../assets/images/snsd/party.jpg";

export default function CardAlbum (){
    return (
        <div className="card-album p-3 block flex-shrink-0">
            <a href="#" className="block relative">
                <img
                    alt="name"
                    src={partySNSD}
                    className="w-36 h-36 rounded-xl"/>
            </a>
            <div className="mt-3 flex flex-column gap-2 text-left">
                <span className="font-semibold truncate">I GOT A BOY</span>
                <span className="text-xs">SNSD</span>
            </div>
        </div>
    )
}