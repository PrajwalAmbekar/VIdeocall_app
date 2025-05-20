import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
const Layout = ({ children, showSidebar = false }) => {
    return (
        <div className='min-h-screen flex'>
           <div className='flex '>
            {showSidebar && <Sidebar />}
           </div>
           <div className='flex flex-col flex-1'>
            <Navbar/>
            <main className='flex-1 overflow-y-auto'>{children}</main>
            </div>

        </div>
  )
};

export default Layout