import React from "react";
import Logo from "../../assets/images/logo.svg";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css"
import { mostViewedCites } from "../../constants/mostViewedCities";
import { FaXTwitter, FaLinkedin,FaYoutube} from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="divar logo"/>
        <div className={styles.header_links}>
          <Link to="/profile">ثبت آگهی</Link>
          <Link to="#">درباره دیوار</Link>
          <Link to="#">دریافت برنامه</Link>
          <Link to="#">اتاق خبر</Link>
          <Link to="#">پشتیبانی</Link>
        </div>
      </div>
      <div className={styles.search}>
        <p>
          دﯾﻮار، ﭘﺎﯾﮕﺎه ﺧﺮﯾﺪ و ﻓﺮوش ﺑﯽ‌واﺳﻄﻪ‌ !<br/> اﮔﻪ دﻧﺒﺎل ﭼﯿﺰی ﻫﺴﺘﯽ، ﺷﻬﺮت رو
          اﻧﺘﺨﺎب ﮐﻦ و ﺗﻮ دﺳﺘﻪ‌ﺑﻨﺪی‌ﻫﺎ ﺑﻪ دﻧﺒﺎﻟﺶ ﺑﮕﺮد. اﮔﺮ ﻫﻢ ﻣﯽ‌ﺧﻮای ﭼﯿﺰی
          ﺑﻔﺮوﺷﯽ، ﭼﻨﺪ ﺗﺎ ﻋﮑﺲ ﺧﻮب ازش ﺑﮕﯿﺮ و آﮔﻬﯿﺖ رو ﺑﭽﺴﺒﻮن ﺑﻪ دﯾﻮار.
        </p>
        <div className={styles.search_box}>
          <BsSearch />
          <input placeholder="جستجوی شهر" />
        </div>
      </div>
      <div className={styles.city_section}>
        <h3>شهرهای پربازدید</h3>
        <div>
          {
            mostViewedCites.map((city,i)=><Link key={i} to="#">{city}</Link>)
          }
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.certs}>

        </div>
        <div className={styles.socails}>
          <Link to="#"><FaXTwitter /></Link>
          <Link to="#"><RiInstagramFill /></Link>
          <Link to="#"><FaLinkedin /></Link>
          <Link to="#"><FaYoutube /></Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
