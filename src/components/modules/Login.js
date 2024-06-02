import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import styles from "./Login.module.css";
import { e2p, p2e } from "../../utils/replaceNumber";
import { msToSec } from "../../utils/millisToSec";
import { sendOtp,checkOtp } from "../../services/auth";
import { codePatten } from "../../utils/mobileChecker";
import { getProfile } from "../../services/user";
import { useQuery } from "@tanstack/react-query";





function Login({mobile,setStep,time}) {
  const {refetch} = useQuery(  {queryKey:["profile"],queryFn:getProfile})
  const ref = useRef()
  
  const [valid, setValid] = useState(false)
  const [error, setError] = useState("")
  const [code, setCode] = useState("")
  const[timer, setTimer] = useState(msToSec(time))
  const timeOutCallback = useCallback(()=>setTimer(currTime => currTime - '1'),[])
  const clickHandler = ()=>{
    setStep(1)
  }
  useEffect(()=>{
    timer > 0 && setTimeout(timeOutCallback,1000)
  },[timer,timeOutCallback])

  const resendCode = async() =>{
        const res = await sendOtp(p2e(mobile))
        if(res.status===200){ setTimer(msToSec(res.timer));
    }
  }
  const loginHandler = useCallback(async(code)=>{
    const response = await checkOtp(p2e(mobile),code)
    
    if(response.data.status===200){
      refetch()
      setStep(3)
      setCode("")
      
    }else{
        setCode("")
        setValid(true)
        setError(response.data.message)
    }


  },[setStep,setError,setValid,mobile,refetch])
  useEffect(()=>{
    if(codePatten.test(code)) loginHandler(code)
  },[code,loginHandler])
useEffect(()=>{
  ref.current.focus()
},[])
return(<Modal title="ورود به حساب کاربری">
    <div className={styles.main_section}>
      <div className={styles.content}>
        <p className={styles.title}>کد تایید را وارد کنید</p>
        <div className={styles.auth_contentMsg}>
          <p>کد پیامک شده به شماره ≪{e2p(mobile)}≫ را وارد کنید</p>
        </div>
        <div className={styles.text_field}>
          <input 
          ref={ref}
          type="text"
          maxLength="6" size="6"
          placeholder="کد تایید ۶ رقمی" 
          value={code}
          onChange={(e)=>setCode(e.target.value)}
          className={valid ? styles.uncomplete :styles.complete }
          required
          />
        </div>
        {
            error ? <p style={{
              fontSize:"12px",
              width:"fit-content",
              padding:"2px 10px",
              textAlign:"center",
              color:"red",
              }}>{error}</p> : null 
          }
        <div className={styles.number_change}>
          <button onClick={clickHandler} >
            تغییر شماره موبایل
          </button>
        </div>
      </div>
    </div>
    <div className={styles.btn}>
      {
        timer ? <p className={styles.resend_txt}>درخواست مجدد<span>{e2p(timer)}</span></p> 
        :
        <button className={styles.resendCode} onClick={resendCode} >درخواست کد</button>
      }
      <button className={styles.submit_btn} onClick={()=>loginHandler(code)}>ورود</button>
    </div>
  </Modal>)
}

export default Login