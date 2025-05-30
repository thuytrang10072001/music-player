import React, {useEffect, useState} from 'react'
import Layout from "../components/Layout";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../styles/pages/Home.css";
import { Song, Artist, Album } from '@interfaces/index';
import CardArtist from "../components/card/CardArtist";
import CardAlbum from "../components/card/CardAlbum";
import CardSong from "../components/card/CardSong";
import { useGetListQuery } from "../services/AlbumApi";
import { useGetListSongQuery } from "../services/SongApi";
import { useGetListArtistQuery } from "../services/ArtistApi";
import { setLoading } from "../store/LoadingSlice";

interface ApiProps {
    spotify_id: string,
    name: string,
    title: string,
    picture: string,
    artist: {
        name: string
    }
}

export default function Home() {
    const nav =  useNavigate();
    const {data: listAlbum, isLoading: isLoadingAlbum} = useGetListQuery({page: 1, limit: 50});
    const {data: listArtist, isLoading: isLoadingArtist } = useGetListArtistQuery({page: 1, limit: 50});
    const {data: listSong, isLoading: isLoadingSong} = useGetListSongQuery({page: 1, limit: 50});

    const dispatch = useDispatch();
    const isLoading = isLoadingAlbum || isLoadingArtist || isLoadingSong;

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    const handleShowListAlbum = () => {
        nav("/list-albums");
    }

    const handleShowListArtist = () => {
        nav("/list-artists");
    }

    const handleShowListSong = () => {
        nav("/list-songs");
    }

    return (
        <Layout>
            <div className="main flex-1 bg-bg p-3 w-full overflow-y-auto">
                <div className="main-artists">
                    <div className="main-title flex justify-content-between items-center py-2">
                        <div className="title font-semibold text-xl">Nghệ sĩ</div>
                        <Button className="bg-transparent border-0 text-xs"
                                onClick={() => handleShowListArtist()}
                        >
                            Hiện tất cả
                        </Button>
                    </div>
                    <div className="main-list w-full max-w-full py-4 px-2 overflow-x-auto custom-scrollbar">
                        <div className="flex">
                             {listArtist?.list.data.slice(0,10).map((artist : Artist, index: number) => (
                                 <CardArtist key={`artist-${artist.spotify_id}`} data={artist}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="main-artists">
                    <div className="main-title flex justify-content-between items-center py-2">
                        <div className="title font-semibold text-xl">Album</div>
                        <Button className="bg-transparent border-0 text-xs"
                                onClick={() => handleShowListAlbum()}
                        >
                            Hiện tất cả
                        </Button>
                    </div>
                    <div className="main-list overflow-x-auto py-4 px-2 custom-scrollbar">
                        <div className="flex">
                            {listAlbum?.list.data.slice(0, 10).map((album: Album, index: number) => (
                                <CardAlbum key={`album-${album.spotify_id}`} data={album} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="main-artists">
                    <div className="main-title flex justify-content-between items-center py-2">
                      <div className="title font-semibold text-xl">Bài hát</div>
                      <Button className="bg-transparent border-0 text-xs"
                              onClick={() => handleShowListSong()}
                      >
                          Hiện tất cả
                      </Button>
                  </div>
                    <div className="main-list w-full overflow-x-auto  py-4 px-2 custom-scrollbar">
                        <div className="flex">
                            {listSong?.list?.data.slice(0, 20).map((song: Song, index: number) => (
                              <CardSong key={`song-${song?.spotify_id}`} data={song} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
      </Layout>
  )
}
