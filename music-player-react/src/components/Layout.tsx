import React from 'react'
import { useLocation } from 'react-router-dom';

import Sidebar from './Sidebar'
import Header from "./Header";

interface Props {
    children: React.JSX.Element;
}

const Layout = ({children} : Props) => {
    const location = useLocation();
    const hide = ['/play-music', '/detail-album', '/detail-artist'].some((path) =>
        location.pathname.startsWith(path)
    );

    return (
    <div className='main-layout row m-0'>
        <Sidebar />
        <div className="col-9 min-h-svh">
            <div className="min-h-screen flex flex-col">
                {!hide && <Header />}
                <main className={`mt-${!hide? 16 : 0}`}>
                    {children}
                </main>
            </div>
        </div>
    </div>
)}

export default Layout;
