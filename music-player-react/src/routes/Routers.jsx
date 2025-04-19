import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "../pages/Home";
import Login from "../pages/Login"
import PlayList from "../pages/PlayList";
import Player from "../pages/Player";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
export default function Routers() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/sign-in' element={<Login/>} />
            <Route path='/sign-up' element={<Register/>} />
            <Route path='/forgot-password' element={<ForgotPass/>} />
            <Route path='/play-music' element={<Player/>}/>
            <Route path='/play-list' element={<PlayList/>} />
        </Routes>
    </Router>
  )
}
