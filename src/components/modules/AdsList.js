import React from "react";
import Loader from "./Loader";
import styles from "./AdsList.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function AdsList({
  title,
  loading,
  data,
  step,
  setStep,
  setFilterData,
  filterData,
  slug
}) {
  const navigate = useNavigate();
  const clickHandler = (slug) => {
    navigate(`/create?slug=${slug}`);
    if (step === 0) {
      const filter = data.filter((i) => i.slug === slug)[0];
      setFilterData(filter);
    } else if (step === 1) {
      const filter = data.filter((i) => i.slug === slug)[0];
      setFilterData({
        ...filterData,
        filter,
      });
    } else if(step===2){
      const filter = data.filter((i) => i.slug === slug)[0];
      setFilterData({
        ...filterData,
        filter,
      });
    }
    setStep((prev) => prev + 1);
  };
  const prevHandler = () => {
    if (step === 0) {
      navigate("/create")
      setStep(0);
    } else {
      navigate(`/create?slug=${slug}`)
      setStep((prev) => prev - 1);
    }
  };
  
  return (
    <div className={styles.adsList}>
      <div className={styles.adsListTitle}>
        <h3>{title}</h3>
        <p>انتخاب دسته بندی</p>
      </div>
      <div className={styles.adsListContent}>
        <div className={styles.search_box}>
          <BsSearch />
          <input placeholder="جستجو در دسته ها" />
        </div>
        {loading && <Loader />}
        {step >= 1 && (
          <li className={styles.prevStep} onClick={prevHandler}>
            <FaChevronRight />
            بازگشت
          </li>
        )}
        {data?.map((i) => (
          <ul key={i._id}>
            <li onClick={() => clickHandler(i.slug)}>
              {i.name}
              <FaChevronLeft />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default AdsList;
