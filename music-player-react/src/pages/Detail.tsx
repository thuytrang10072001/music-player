import React from "react";
import { useLocation } from 'react-router-dom';
import { Pagination, Stack } from "@mui/material";

import Layout from "../components/Layout";
import Header from "../components/Header";
import CardArtist from "../components/card/CardArtist";
import CardAlbum from "../components/card/CardAlbum";
import CardSong from "../components/card/CardSong";

interface item {
    spotify_id: string,
    name: string,
    title: string,
    picture: string,
    artist: {
        name: string
    }
};

export default function Detail (){
    const location = useLocation();
    const { title, list, renderType } = location.state;

    const renderItem = (item: item) => {
        switch (renderType) {
            case "artist":
                return <CardArtist data={item} key={`artist-${item.spotify_id}`}/>;
            case "album":
                return <CardAlbum data={item} key={`album-${item.spotify_id}`}/>;
            case "song":
                return <CardSong data={item} key={`song-${item.spotify_id}`}/>;
            default:
                return null;
        }
    };

    return (
        <Layout>
            <div className="flex-1 flex flex-col bg-bg p-3 pt-16 overflow-hidden min-h-[calc(100vh-64px)]">
                <div className="main-artists flex-shrink-0">
                    <div className="main-title flex justify-between items-center py-2">
                        <div className="title font-semibold text-xl">{title}</div>
                    </div>
                </div>

                {/* Phần danh sách scroll */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="main-list py-4 px-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {list.map((item: item, index: number) => renderItem(item))}
                        </div>
                    </div>
                </div>
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Pagination count={10} color="secondary"
                                size="large"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: 'white', // màu số
                                    },
                                    '& .Mui-selected': {
                                        backgroundImage: 'linear-gradient(to top, #30cfd0, #330867)',
                                        color: 'white', // màu số khi selected
                                    },
                                }}
                    />
                </Stack>
            </div>
        </Layout>
    );
}