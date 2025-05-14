import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "../pages/Home";
import Login from "../pages/Login"
import PlayList from "../pages/PlayList";
import Player from "../pages/Player";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
import PrivateRoute from "./PrivateRoute";
import AuthRedirect from "./AuthRedirect";
import Detail from "../pages/Detail";

export default function Routers() {
  return (
    <Router>
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
            <Route path='/detail-albums' element={<Detail/>}/>
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
