import React, { useRef, useState } from 'react';

import Layout from "../components/Layout";
import Progressbar from "../components/Progressbar";
import partySNSD from "../assets/images/snsd/party.jpg";

export default function Player() {

    const css = {
        nameSong: "name song text-2xl font-bold",
        nameArtist: "name-artist text-xl font-bold",
    }

    return(
        <Layout>
            <div className="player w-full max-h-screen h-screen bg-bg">
                <div className="py-4 h-full flex flex-column justify-content-between">
                    <div className="info-song">
                        <div className="avatar">
                            <img
                                alt="name"
                                src={partySNSD}
                                className="w-1/4 h-1/4 rounded-xl mx-auto"/>
                        </div>
                        <div className="lyrics">
                            {/*{lyrics.map((line, index) => (*/}
                            {/*    <p*/}
                            {/*        key={index}*/}
                            {/*        className={currentTime >= line.time ? 'text-green-400 font-bold' : 'text-white'}*/}
                            {/*    >*/}
                            {/*        {line.text}*/}
                            {/*    </p>*/}
                            {/*))}*/}
                        </div>
                    </div>
                    <div className="info-artist mx-auto w-fit flex flex-column items-center gap-2">
                        <span className={css.nameSong}>Into The New World</span>
                        <span className={css.nameArtist}>Girls' Generation</span>
                    </div>
                    <Progressbar/>
                </div>
            </div>
        </Layout>
    )
}