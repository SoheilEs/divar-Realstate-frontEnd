import React from 'react'
import Logo from "../../assets/images/logo.svg";
import { GrLocation } from "react-icons/gr";
import { FaRegUser,FaUser} from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import styles from "./Header.module.css"
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import MenuList from '../modules/MenuListBtn';


function Header({data,path=""}) {
  const pathName = path.split("/")[1]
  const {mobile,role} = data
  return (
    <header>
      <div className={styles.right}>
        <div className={styles.logo}>
          <img src={Logo} alt='logo' />
        </div>
        <Divider orientation="vertical" variant='middle' flexItem  />
        <button><GrLocation />انتخاب شهر</button>
      </div>
      <div className={styles.left}>
        <MenuList name={role ==="ADMIN" ?"ادمین" : "دیوار من"} icon={role === "ADMIN" ?<FaUser />:<FaRegUser />} mobile={mobile} role={role} />
        {
          role !== "ADMIN" ? 
        <div className={styles.links}>
          <Link to="#"><HiOutlineChatBubbleOvalLeft />چت</Link>
          <Link to="#">پشتیبانی</Link>
          {
            pathName !== "create" && <Link to="/create">ثبت آگهی</Link>
          }
        </div>:null
        }
      </div>
    </header>
  )
}

export default Header