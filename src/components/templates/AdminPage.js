import React from 'react'

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";
import Loader from '../modules/Loader';
import { Outlet, useLocation } from 'react-router-dom';
import Layout from '../layout/Layout';
import DataTable from '../modules/Tabel';
import { BsFileEarmarkText } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import styles from "./AdminPage.module.css"

const userTabelFields = ["شناسه کاربری","موبایل","تاریخ ایجاد","نقش","تایید شده","ویرایش / حذف"]
const adsTabelFields = ["شناسه کاربری","موبایل","تاریخ ایجاد","نقش","تایید شده","ویرایش / حذف"]
function AdminPage() {
  const {pathname} =useLocation()
  const {data,isLoading} = useQuery({queryKey:["profile"],queryFn:getProfile})
  if(isLoading) return <Loader />
  return (
      <Layout data={data}>
      {
        pathname === "/admin" ?
        <div>
        <div className={styles.info}>
          <div className={styles.tabel}>
            <h3>کاربران</h3>
            <input type='search' placeholder='جستجو...' />
            <DataTable fields={userTabelFields} />
          </div>
          <div className={styles.gadget}>
              <div className={styles.firstItem}>
                <h3>تعداد کل آگهی ها</h3>
                <p>234,435</p>
                <span><BsFileEarmarkText /></span>
              </div>
              <div className={styles.secondItem}>
                <h3>تعداد کل کاربران</h3>
                <p>2,434</p>
                <span><FiUsers /></span>
              </div>
          </div>
        </div>
        <div className={styles.adsInfo}>
          <div className={styles.tabel}>
            <h3>آگهی های تایید نشده</h3>
            <input type='search' placeholder='جستجو...' />
            <DataTable fields={adsTabelFields} />
          </div>
        </div>
        </div>
        :
      
          <Outlet />

      }
      </Layout>

  )
}

export default AdminPage