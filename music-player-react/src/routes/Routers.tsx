import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import PrivateRoute from "./PrivateRoute";
import AuthRedirect from "./AuthRedirect";
import Home from "../pages/Home";
import Login from "../pages/Login"
import PlayList from "../pages/PlayList";
import Player from "../pages/Player";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
import ListArtist from "../pages/ListArtist";
import DetailAlbum from "../pages/DetailAlbum";
import ListAlbum from "../pages/ListAlbum";
import ListSong from "../pages/ListSong";
import DetailArtist from "../pages/DetailArtist";
import ListAlbumRelated from "../pages/ListAlbumRelated";
import ScrollToTop from "../components/ScrollToTop";

export default function Routers() {
  return (
    <Router>
        <ScrollToTop/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/sign-in'
                   element={
                       <AuthRedirect>
                           <Login />
                       </AuthRedirect>
                   }
            />
            <Route path='/sign-up'
                   element={
                       <AuthRedirect>
                           <Register />
                       </AuthRedirect>
                   }
            />
            <Route path='/forgot-password'
                   element={
                       <AuthRedirect>
                           <ForgotPass />
                       </AuthRedirect>
                   }
            />
            <Route path='/play-music' element={<Player/>}/>
            <Route path='/list-albums' element={<ListAlbum/>}/>
            <Route path='/list-songs' element={<ListSong/>}/>
            <Route path='/list-artists' element={<ListArtist/>}/>
            <Route path='/detail-album/:id' element={<DetailAlbum/>}/>
            <Route path='/detail-artist/:id' element={<DetailArtist/>}/>
            <Route path='/related-albums/:id' element={<ListAlbumRelated/>}/>
            {/*<Route path='/play-list'*/}
            {/*       element={*/}
            {/*           <PrivateRoute>*/}
            {/*               <PlayList />*/}
            {/*           </PrivateRoute>*/}
            {/*       }*/}
            {/*/>*/}
            <Route path='/play-list'
                   element={<PlayList />}
            />
        </Routes>
    </Router>
  )
}
