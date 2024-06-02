import React, { useState } from "react";
import Header from "../layout/Header";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";
import Loader from "../modules/Loader";
import { useLocation } from "react-router-dom";
import { listCategory } from "../../services/admin";
import styles from "./CreateAds.module.css";
import AdsList from "../modules/AdsList";
import AdsSubmit from "../modules/AdsSubmit";

function CreateAds() {
  const [step, setStep] = useState(0);
  const [filterData, setFilterData] = useState({});
  const { pathname } = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const { data: categoryList } = useQuery({
    queryKey: ["getCategories"],
    queryFn: listCategory,
  });
  return (
    <div className={styles.container}>
      <Header data={data?.data} path={pathname} />
      {isLoading && <Loader />}
      {step === 0 && (
        <AdsList
          step={step}
          setStep={setStep}
          data={categoryList?.data}
          setFilterData={setFilterData}
          title={"اضافه کردن آگهی"}
        />
      )}
      {step === 1 && (
        <AdsList
          step={step}
          setStep={setStep}
          data={filterData.children}
          setFilterData={setFilterData}
          title={filterData.name}
          filterData={filterData}
          slug={""}
        />
      )}
      {step === 2 && (
        <AdsList
          step={step}
          setStep={setStep}
          data={filterData.filter.children}
          title={filterData.filter.name}
          slug={filterData.slug}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      )}
      {step === 3 && (
        <AdsSubmit filterData={filterData.filter} step={step} setStep={setStep}/>
      )}
    </div>
  );
}

export default CreateAds;

