import React, { useState } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import {FaCirclePlay, FaEllipsisVertical} from "react-icons/fa6";
import ModalPlaylist from "./modal/ModalPlayList";

export default function DropdownMenu (){
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);

    return (
        <>
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle split id="dropdown-split-basic" >
                    {/*<FaEllipsisVertical/>*/}
                    {FaEllipsisVertical({ className: ""})}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
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