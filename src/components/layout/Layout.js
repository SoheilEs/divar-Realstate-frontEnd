import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useQuery } from '@tanstack/react-query';
import { getProfile } from "../../services/user";

function Layout({children}) {
  const {
    data,
  } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  return (
    <>
        <Header data={data.data} />
        <Sidebar>
          <div>
              {children}
          </div>
        </Sidebar>
    </>
  )
}

export default Layout