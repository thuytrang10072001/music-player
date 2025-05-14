import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
    show: boolean,
    setShow: (value: boolean) => void
}
export default function ModalAddPlaylist(props: Props) {
    const { show, setShow } = props
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="name">Tên danh sách</label>
                <input className="w-full border-2 rounded-l border-blue-500" id="name" name="name"/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
