import React from 'react'
import { Outlet } from 'react-router-dom'
import TopHeader from '../TopHeader/TopHeader'
import MainHeader from '../MainHeader/MainHeader'

const Layout = () => {
  return (
    <div>
        <TopHeader />
        <MainHeader />
        <Outlet />
        <h1>footer</h1>
    </div>
  )
}

export default Layout