import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='main-layout row'>
        <Sidebar />
        <div className="col-9 min-h-svh">
            {children}
        </div>
    </div>
  )
}

export default Layout;
