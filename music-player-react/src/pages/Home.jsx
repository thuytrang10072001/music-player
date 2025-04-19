import React from 'react'
import Layout from "../components/Layout";
import { Button } from "react-bootstrap";

import "../styles/pages/Home.css";
import partySNSD from "../assets/images/snsd/party.jpg";
import CardArtist from "../components/card/CardArtist";
import CardAlbum from "../components/card/CardAlbum";
import Header from "../components/Header";
export default function Home() {
  return (
      <Layout>
          <div className='w-80' style={{flex: '1'}}>
              <Header/>
              <div className="main bg-bg p-3 w-full">
                  <div className="main-artists">
                      <div className="main-title flex justify-content-between items-center py-2">
                          <div className="title font-semibold text-xl">Nghệ sĩ</div>
                          <Button className="bg-transparent border-0 text-xs">Hiện tất cả</Button>
                      </div>
                      <div
                          className="main-list w-full overflow-x-auto overflow-y-hidden whitespace-nowrap py-4 px-2 hide-scrollbar">
                          <div className="flex">
                              {[...Array(10)].map((_, index) => (
                                  <CardArtist/>
                              ))}
                          </div>
                      </div>
                  </div>
                  <div className="main-artists">
                      <div className="main-title flex justify-content-between items-center py-2">
                          <div className="title font-semibold text-xl">Album</div>
                          <Button className="bg-transparent border-0 text-xs">Hiện tất cả</Button>
                      </div>
                      <div
                          className="main-list overflow-x-auto overflow-y-hidden py-4 px-2 hide-scrollbar">
                          <div className="flex">
                              {[...Array(10)].map((_, index) => (
                                  <CardAlbum/>
                              ))}
                          </div>
                      </div>
                  </div>
                  <div className="main-artists">
                      <div className="main-title flex justify-content-between items-center py-2">
                          <div className="title font-semibold text-xl">Bảng xếp hạng</div>
                          <Button className="bg-transparent border-0 text-xs">Hiện tất cả</Button>
                      </div>
                      <div
                          className="main-list w-full overflow-x-auto overflow-y-hidden whitespace-nowrap py-4 px-2 hide-scrollbar">
                          <div className="flex">
                              {[...Array(10)].map((_, index) => (
                                  <CardAlbum/>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </Layout>
  )
}
