import React from "react";
import styles from "./Card.module.css"
import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate()
  const clickHandler = ()=>{
    navigate(`${data._id}`);
  }
  return (
    <div className={styles.container} onClick={clickHandler}>
      <div className={styles.info}>
        <p>{data.title}</p>
        <p>شهر : {data.city}</p>
        <p>قیمت : {data.amount}</p>
        <p>تاریخ ایجاد : {new Date(data.createdAt).toLocaleDateString("Fa")}</p>
      </div>
      <div className={styles.imgContainer}>
        {data.images.map((img, index) => (
          <img
            key={index}
            src={`${process.env.REACT_APP_SERVER_URL}${img}`}
            alt={data.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Card;
