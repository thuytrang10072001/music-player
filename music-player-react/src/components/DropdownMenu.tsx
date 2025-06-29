import React, { useState } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { FaEllipsisVertical } from "react-icons/fa6";
import ModalPlaylist from "./modal/ModalPlayList";
import { useDispatch } from "react-redux";
import { useAudio } from "../hooks/AudioContext";
import { setCurrentSong } from "../store/MusicPlayerSlice";
import { PropsSong } from "@interfaces/index";

export default function DropdownMenu ({data} : PropsSong){
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { play } = useAudio();
    const handleShow = () => setShowModal(true);

    const handlePlay = () => {
        dispatch(setCurrentSong(data));
        play();
    }
    return (
        <>
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle split id="dropdown-split-basic" >
                    {FaEllipsisVertical({ className: ""})}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handlePlay}>
                        Phát
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleShow}>
                        Thêm vào danh sách
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <ModalPlaylist
                show={showModal}
                setShow={setShowModal}
            />
        </>
    )
}