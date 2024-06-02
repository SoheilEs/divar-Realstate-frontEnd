import React, { useState } from "react";
import styles from "./AdsSubmit.module.css";
import { Button } from "@mui/material";
import vehicle from "../../assets/images/vehicles.png";
import Map from "./Map";
import { useQuery } from "@tanstack/react-query";
import { getOptions } from "../../services/ads";
import AdsOptions from "./AdsOptions";
import Loader from "./Loader";
import IMG from "../../assets/images/download.svg";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function AdsSubmit({ filterData, setStep }) {
  const navigate = useNavigate()
  const { data: adsOptions, isLoading } = useQuery({
    queryKey: ["adsOptions", filterData._id],
    queryFn: ({ queryKey }) => getOptions(queryKey[1]),
  });
  const [data, setData] = useState({
    title: "",
    content: "",
    amount: "",
    category: "",
    province: "",
    city: "",
    district: "",
    address: "",
    coordinate: [],
    images: [],
    options: [],
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name !== "images") {
      setData({
        ...data,
        [name]: value,
      });
    } else {
   
      if (e.target.files.length > 1) {
        setData({
          ...data,
          [name]: [...data.images,...e.target.files],
        });
      }else {
        setData({
          ...data,
          images: [...data.images,e.target.files[0]]
        })
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData()
    for( let i in data) {
      if(i === 'images') continue
      if(i === 'options') formData.append(i,JSON.stringify(data[i]))
      else formData.append(i,data[i])
    }
    formData.set("category",filterData._id)
    Array.from(data.images).forEach(img=>{
      formData.append("images",img)
    })
    axios.post('http://localhost:3001/ads',formData,{
      withCredentials: true,
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      transformRequest : formData => formData
    })
    .then(res => {
      if(res.data.status === 201) {
        toast.success('آگهی شما با موفقیت ثبت شد')
        setTimeout(()=>{navigate("/user/ads")},2000)
        
      }
      else toast.error("خطایی رخ داده است")
    })
  };
  const deleteHandler = (index) => {
    data.images.splice(index, 1);
    setData({
      ...data,
    });
  };
  if (isLoading) return <Loader />;
  return (
    <div className={styles.container}>
      <div className={styles.adsSubmitTitle}>
        <h3>ثبت آگهی</h3>
        <div>
          <p>
            {filterData.name}
            <img src={vehicle} alt="car" />
          </p>
          <Button onClick={() => setStep(0)} variant="contained" color="error">
            تغییر دسته بندی
          </Button>
        </div>
      </div>
      <div className={styles.map}>
        <p className={styles.mapTitle}>موقعیت مکانی آگهی</p>
        <Map data={data} setData={setData} />
      </div>
      <form
        onSubmit={submitHandler}
        onChange={changeHandler}
        className={styles.adsForm}
      >
        <label htmlFor="title">عنوان :</label>
        <input type="text" name="title" placeholder="عنوان آگهی..." />
        <label htmlFor="content">توضیحات :</label>
        <textarea type="text" name="content" />
        <label htmlFor="amount">قیمت : </label>
        <input type="number" name="amount" placeholder="قیمت به تومان..."/>
        <div className={styles.imgUpload}>
          <div className={styles.imgAdd}>
            <p>بارگذاری تصاویر</p>
            <label htmlFor="images">
              <input type="file" multiple name="images" id="images" />
              <img src={IMG} alt="img" />
              <MdOutlineAddPhotoAlternate />
            </label>
          </div>
          {data?.images?.map((image, index) => (
            <div className={styles.selectedImg} key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt={image.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginTop: "50px",
                  marginRight: "10px",
                }}
              />
              <button onClick={() => deleteHandler(index)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        {adsOptions?.data.map((option, index) => (
          <AdsOptions
            key={index}
            options={option}
            data={data}
            setData={setData}
          />
        ))}
        <div className={styles.btns}>
          <Button onClick={() => setStep(0)} color="error" variant="contained">
            انصراف
          </Button>
          <Button type="submit" variant="contained">
            ثبت آگهی
          </Button>
        </div>
      </form>
      <Toaster toastOptions={{
        style:{
          direction:"ltr"
        }
      }} />
    </div>
  );
}

export default AdsSubmit;
