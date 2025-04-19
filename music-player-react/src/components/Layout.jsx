import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='main-layout h-auto flex gap-2 p-2.5 w-full'>
        <Sidebar />
        {children}
    </div>
  )
}

export default Layout;
