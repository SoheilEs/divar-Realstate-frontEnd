import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { userAds } from "../../services/ads";
import Loader from "../modules/Loader";
import styles from "./AdsPage.module.css";
import { Divider } from "@mui/material";
import Card from "../modules/Card";

function AdsPage() {
  const { data, isLoading,refetch } = useQuery({
    queryKey: ["userAds"],
    queryFn: userAds,
  });
  useEffect(()=>{
    refetch()
  },[refetch])
  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      <h3>
        آگهی های ایجاد شده
      </h3>
        <Divider
          sx={{
            borderBottomWidth: "4px",
            borderRadius: "10px",
            backgroundColor: "#C70039",
            my: "10px",
            width: "170px",
          }}
        />
        <div className={styles.adsCard}>
          {data?.data?.data?.map((i) => (
            <Card data={i} key={i._id}  />
          ))}
        </div>
    </div>
  );
}

export default AdsPage;
