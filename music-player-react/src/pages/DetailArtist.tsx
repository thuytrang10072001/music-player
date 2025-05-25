import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch } from "react-redux";

import '../styles/pages/DetailArtist.css';
import {Album, Song} from "@interfaces/index";
import Layout from "../components/Layout";
import ModalPlaylist from "../components/modal/ModalPlayList";
import ButtonPlay from "../components/button/ButtonPlay";
import CardAlbum from "../components/card/CardAlbum";
import { useGetArtistByIdQuery } from "../services/ArtistApi";
import { setLoading } from "../store/LoadingSlice";
import { formatDuration } from "../utils/helper";

export default function DetailArtist (){
    const nav =  useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams<{ id: string }>();
    const { data, isFetching } = useGetArtistByIdQuery({id, page: 1, limit: 50});
    const detailArtist = {
        name: data?.artist?.name || '',
        picture: data?.artist?.picture || '',
        albums: data?.albums?.data || [],
        songs: data?.songs?.data || []
    }
    const handleShow = () => setShowModal(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(isFetching));
    }, [isFetching, dispatch]);

    return (
        <Layout>
            <div className="flex-1 flex flex-col bg-bg overflow-hidden min-h-[calc(100vh-64px)]">
                <div className="bg-artist h-64 p-4 flex items-center"
                     style={{ backgroundImage: `url(${detailArtist.picture})` }}>
                    <div className="bg-artist-overlay"></div>
                    <h1 className="text-7xl font-bold position-relative z-10">{detailArtist.name}</h1>
                </div>
                <div className="action px-4 py-3 flex items-center gap-3">
                    <ButtonPlay/>
                    {FiPlusCircle({
                        className: "text-3xl cursor-pointer",
                        style: {stroke: "white"},
                        onClick: handleShow
                    })}
                </div>
                <div className="table-songs px-4">
                    <div className="title font-semibold text-xl">Bài hát nổi bật</div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-white">
                            <thead className="border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tiêu đề
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {FaRegClock({
                                        className: "text-2xl",
                                        style: {stroke: "white"}
                                    })}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {detailArtist.songs.map((song : Song, index : number) =>
                                <tr>
                                    <th scope="row"
                                        className="px-6 py-2 font-medium whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-2">
                                        {song.title}
                                    </td>
                                    <td className="px-6 py-2">
                                        {formatDuration(song.duration)}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="main-artists p-4">
                    <div className="main-title flex justify-content-between items-center py-2">
                        <div className="title font-semibold text-xl">Album liên quan</div>
                    </div>
                    <div className="main-list overflow-x-auto py-4 px-2 custom-scrollbar">
                        <div className="flex">
                            {detailArtist.albums.map((album: Album, index: number) => (
                                <CardAlbum key={`album-${album.spotify_id}`} data={album}/>
                            ))}
                        </div>
                    </div>
                </div>
                <ModalPlaylist
                    show={showModal}
                    setShow={setShowModal}
                />
            </div>
        </Layout>
    );
}