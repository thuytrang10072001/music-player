import React, {useState} from 'react'
import { FaSquarePlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";

import Layout from "../components/Layout";
import CardAlbum from "../components/card/CardAlbum";
import ModalAddPlaylist from "../components/modal/ModalAddPlaylist";
import { btnIcon } from "../utils/helper";
import { Album } from "@interfaces/index";

export default function PlayList() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const test = [
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },
        {
            album_id: "dsdssdagg",
            spotify_id: "dadadsadsdadsd",
            picture: "https://i.scdn.co/image/ab6761610000e5eb385df356841aaec34a0914aa",
            title: "Into The New World",
            name: "SNSD",
            artist: {
                name: "SNSD"
            }
        },

    ]

    return (
      <Layout>
          <div className="flex-1 flex flex-col bg-bg p-3 w-full overflow-hidden min-h-[calc(100vh-64px)]">
              <div className="main-artists flex-shrink-0">
                  <div className="main-title flex justify-between items-center py-2">
                      <div className="title font-semibold text-xl">Play list</div>
                  </div>
              </div>
              <div
                  className="main-list w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {test.map((playPlist: Album, index: number) => (
                      <CardAlbum key={`playlist-${index}`} data={playPlist} />
                  ))}
                  <div className="flex items-center justify-content-center p-7">
                      <Button className={btnIcon()}
                              onClick={handleShow}
                      >
                          {FaSquarePlus ({className: "text-6xl"})}
                      </Button>
                  </div>

              </div>
              <ModalAddPlaylist
                  show={show}
                  setShow={setShow}
              />
          </div>
    </Layout>
)
}
