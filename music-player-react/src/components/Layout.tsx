import React from 'react'
import Sidebar from './Sidebar'
import Header from "./Header";

interface Props {
    children: React.JSX.Element;
}

const Layout = ({children} : Props) => {
  return (
    <div className='main-layout row m-0'>
        <Sidebar />
        <div className="col-9 min-h-svh">
            <div className="min-h-screen flex flex-col">
                <Header/>
                <main className="mt-16">
                    {children}
                </main>
            </div>
        </div>
    </div>
)}

export default Layout;
