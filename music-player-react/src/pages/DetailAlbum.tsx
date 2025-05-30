import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import Color from 'color-thief-react';
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import {FaPlus} from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

import Layout from "../components/Layout";
import {btnIcon, formatDuration} from "../utils/helper";
import ButtonPlay from "../components/button/ButtonPlay";
import CardAlbum from "../components/card/CardAlbum";
import ModalPlaylist from "../components/modal/ModalPlayList";
import { Album, Song } from "@interfaces/index";
import { useShowQuery } from "../services/AlbumApi";
import { setLoading } from "../store/LoadingSlice";


export default function DetailAlbum (){
    const nav =  useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams<{ id: string }>();
    const { data, isFetching } = useShowQuery(id);
    const detailAlbum = {
        picture : data?.data?.album?.picture || '',
        title: data?.data?.album?.title || '',
        artist: {
            name: data?.data?.album?.artist?.name || '',
            picture: data?.data?.album?.artist?.picture || '',
            id:  data?.data?.album?.artist?.artist_id || '',
        },
        listAlbumRelated: data?.data?.list?.data || [],
        songs: data?.data?.album?.songs || []
    }

    const handleShow = () => setShowModal(true);
    const handleShowListAlbum = () => {
        nav(`/related-albums/${id}`);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(isFetching));
    }, [isFetching, dispatch]);

    return (
        <Layout>
            <div className="flex-1 flex flex-col bg-bg overflow-hidden min-h-[calc(100vh-64px)]">
                {/*<Color src={detailAlbum.picture} format="hex">*/}
                {/*    {({ data: dominantColor, loading, error }) => (*/}
                        <div
                            className="bg-album p-4 flex gap-4"
                            style={{
                                // backgroundImage: `linear-gradient(to bottom, ${
                                //     loading || error || !dominantColor ? '#000' : dominantColor
                                // }, #000)`
                                backgroundColor: "black"
                            }}
                        >
                            <img src={detailAlbum.picture} className="w-56 h-56 rounded-xl" loading="lazy"/>
                            <div className="info-album flex flex-column justify-content-end gap-1">
                                <span className="text-xs font-medium">Album - 2015</span>
                                <h1 className="text-4xl font-bold">{detailAlbum.title}</h1>
                                <div className="info-artist flex flex-row items-center gap-2">
                                    <img src={detailAlbum.artist.picture} className="w-10 h-10 rounded-full" loading="lazy"/>
                                    <button className={btnIcon()}
                                            onClick={() => nav(`/detail-artist/${detailAlbum.artist.id}`)}>
                                        <span className="text-lg font-semibold">{detailAlbum.artist.name}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                {/*    )}*/}
                {/*</Color>*/}
                <div className="action px-4 py-3 flex items-center gap-3">
                    <ButtonPlay/>
                    {FiPlusCircle({
                        className: "text-3xl cursor-pointer",
                        style: {stroke: "white"},
                        onClick: handleShow
                    })}
                </div>
                <div className="table-songs px-4">
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
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {detailAlbum.songs.map((song: Song, index: number) =>
                                <tr>
                                    <th scope="row"
                                        className="px-6 py-2 font-medium whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-2">
                                        <Button className={btnIcon("text-sm")}>{song.title}</Button>
                                    </td>
                                    <td className="px-6 py-2">
                                        {formatDuration(song.duration)}
                                    </td>
                                    <td className="px-6 py-2">
                                        {FaPlus({
                                            className: "text-1xl cursor-pointer",
                                            style: {stroke: "white"},
                                            onClick: handleShow
                                        })}
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
                        <Button className="bg-transparent border-0 text-xs"
                                onClick={() => handleShowListAlbum()}
                        >
                            Hiện tất cả
                        </Button>
                    </div>
                    <div className="main-list overflow-x-auto py-4 px-2 custom-scrollbar">
                        <div className="flex">
                            {detailAlbum.listAlbumRelated.map((album: Album, index: number) => (
                                <CardAlbum key={`album-${album.spotify_id}`} data={album} />
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