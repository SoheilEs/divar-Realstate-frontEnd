import React from "react";
import styles from "./Sidebar.module.css";
import { FaRegUser } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { Divider } from "@mui/material";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { useQuery} from "@tanstack/react-query";
import { logOut, getProfile } from "../../services/user";

function Sidebar({ children }) {
  const navigate = useNavigate();
  const {
    data,
    refetch: profileFetch,
  } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const {
    status,
    refetch,
  } = useQuery({ queryKey: ["logout"], queryFn: logOut, enabled: false });
  const clickHandler = async () => {
    await refetch();
    await profileFetch();
    if (status === "success") navigate("/");
  };
  const { role } = data?.data;
  return (
    <div className={styles.container}>
      <aside className={styles.navbar}>
        <div>
          <div className={styles.userInfo}>
            {role === "ADMIN" ? (
              <p>
                <FaUser />
                ادمین
              </p>
            ) : (
              <p>
                <FaRegUser />
                کاربر دیوار
              </p>
            )}
            <span>تلفن ۰۹۱۴۴۰۴۸۰۳۰</span>
          </div>
          {role === "ADMIN" ? (
            <div className={styles.myAds}>
              <NavLink
                to="category"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <MdOutlineLibraryAdd />
                <span>ایجاد دسته</span>
              </NavLink>
            </div>
          ) : null}
          {role === "ADMIN" ? (
            <div className={styles.myAds}>
              <Link to="ads">
                <MdOutlineArticle />
                <span> آگهی ها</span>
              </Link>
            </div>
          ) : (
            <div className={styles.myAds}>
              <Link to="ads">
                <MdOutlineArticle />
                <span> آگهی ها من</span>
              </Link>
            </div>
          )}
          {role === "ADMIN" ? (
            <div className={styles.myAds}>
              <Link to="#">
                <FaUsers />
                <span>لیست کاربران</span>
              </Link>
            </div>
          ) : (
            <div className={styles.myAds}>
              <Link to="ads">
                <IoCreateOutline />
                <span>ثبت آگهی</span>
              </Link>
            </div>
          )}
          <Divider />
          <button onClick={clickHandler} className={styles.logoutBtn}>
            <IoExitOutline />
            خروج
          </button>
        </div>
        <div className={styles.footer}>
          <Divider />
          <div className={styles.info}>
            <p>درباره دیوار</p>
            <p>دریافت برنامه</p>
            <p>اتاق خبر</p>
            <p>کسب و کارها</p>
            <p>پشتیبانی و قوانین</p>
          </div>
          <div className={styles.socialMedia}>
            <Link to="#">
              <FaXTwitter />
            </Link>
            <Link to="#">
              <RiInstagramFill />
            </Link>
            <Link to="#">
              <FaLinkedin />
            </Link>
            <Link to="#">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Sidebar;
