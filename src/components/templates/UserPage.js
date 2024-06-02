import React from 'react'
import Layout from '../layout/Layout'
import { Outlet, useLocation } from 'react-router-dom'

function UserPage() {
    const {pathname} = useLocation()
  return (
    <Layout>
        {
            pathname === "/user" &&   UserPage
        }
        <Outlet />
    </Layout>
  )
}

export default UserPage