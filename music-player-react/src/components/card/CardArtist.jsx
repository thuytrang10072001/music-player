import React from 'react';
import partySNSD from "../../assets/images/snsd/party.jpg";

export default function CardArtist (){
    return (
        <div className="card-artist p-3 block flex-shrink-0">
            <a href="#" className="block relative">
                <img
                    alt="name"
                    src={partySNSD}
                    className="w-36 h-36 rounded-full"/>
            </a>
            <div className="mt-3 text-center">
                <span className="font-semibold">SNSD</span>
            </div>
        </div>
    )
}