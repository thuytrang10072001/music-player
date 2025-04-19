import React, {useState} from 'react'
import { FaSquarePlus } from "react-icons/fa6";
import { Button, Modal } from "react-bootstrap";

import Layout from "../components/Layout";
import Header from "../components/Header";
import CardAlbum from "../components/card/CardAlbum";
import ModalAddPlaylist from "../components/modal/ModalAddPlaylist";
import { btnIcon } from "../utils/helper";

export default function PlayList() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
      <Layout>
        <div className='w-80 bg-bg' style={{flex: '1'}}>
          <Header/>
          <div className="main p-3 w-full">
            <div className="main-artists">
              <div className="main-title flex justify-content-between items-center py-2">
                <div className="title font-semibold text-xl">Playlist</div>
              </div>
              <div
                  className="main-list w-full grid grid-cols-6">
                  {[...Array(10)].map((_, index) => (
                      <CardAlbum/>
                  ))}
                  <div className="flex items-center justify-content-center">
                    <Button className={btnIcon()}
                            onClick={handleShow}
                    >
                      <FaSquarePlus className="text-6xl"/>
                    </Button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <ModalAddPlaylist
          show={show}
          setShow={setShow}
        />
      </Layout>
)}
