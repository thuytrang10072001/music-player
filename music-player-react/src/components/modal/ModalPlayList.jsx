import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CardSong from "../card/CardSong";
import React from "react";

export default function ModalPlaylist(props) {
    const { show, setShow } = props
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm vào Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="list-playlist">
                    {[...Array(10)].map((_, index) => (
                        <div className="list-playlist-item flex item-center">
                            <input type="checkbox" id={`item-playlist-${index}`}
                            />
                            <label className="ml-2.5" htmlFor={`item-playlist-${index}`}>love song</label>
                        </div>))}
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
