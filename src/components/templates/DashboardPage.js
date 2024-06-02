import React, { useEffect, useState } from "react";
import Register from '../modules/Register'
import Login from '../modules/Login'
import Header from '../layout/Header';
import Loader from "../modules/Loader";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";
import { useNavigate } from "react-router-dom";


function DashboardPage() {
  const navigate = useNavigate()
  const {data,isLoading,} = useQuery({queryKey:["profile"],queryFn:getProfile})
  const [step, setStep] = useState(1)
  const [mobile, setMobile] = useState("");
  const[time, setTime] = useState("")
  useEffect(()=>{
   
      if(data?.data?.statusCode === 401) setStep(1)
      else setStep(3)
      if(data?.data?.role ==="ADMIN") navigate("/admin")
      if(data?.data?.role ==="USER") navigate("/user")
  },[data,navigate])

  if(isLoading) return <Loader />

  return (
    <>
    <Header data={data || ""}/>
      {!(isLoading || data?.data?.mobile) ? <Loader />:null}
      {step===1 && <Register mobile={mobile} setMobile={setMobile} setStep={setStep} setTime={setTime} />}
      {step===2  && <Login setStep={setStep}  mobile={mobile} time={time}/> }
      
    </>
  )
}

export default DashboardPage