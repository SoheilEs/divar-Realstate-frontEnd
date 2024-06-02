import React, { useCallback, useEffect, useState} from "react";
import Modal from "./Modal";
import styles from "./Register.module.css";
import { moblePattern } from "../../utils/mobileChecker";
import { e2p, p2e } from "../../utils/replaceNumber";
import { sendOtp } from "../../services/auth";

function Register({mobile,setMobile,setStep, setTime}) {
  const [valid, setValid] = useState(false)
  const [error, setError] = useState("")
  const submitHandler =useCallback(async()=>{
    
    if(mobile.length===0) return(
      setValid(true),
      setError("وارد کردن شماره موبایل الزامی می باشد")
    )
    const mobileNumber = p2e(mobile)
    const result = await sendOtp(mobileNumber)

    if(result.status === 200){ 
      setStep(2)
      setTime(result.timer)
    }else if(result.statusCode === 409){
      setStep(2)
      setTime(result.message)
    }else{
      setError(result.message)
      setValid(true)
    }

  },[setStep,mobile,setTime])
  const changeHandler = (e) =>{
    setMobile(e2p(e.target.value))
  } 
  useEffect(()=>{
    if(moblePattern.test(p2e(mobile))) submitHandler()
  },[mobile,submitHandler])
  useEffect(()=>{
    setMobile("")
  },[setMobile])
  return (
    <Modal title="ورود به حساب کاربری">
      <div className={styles.main_section}>
        <div className={styles.content}>
          <p className={styles.title}>شماره موبایل خود وارد کنید</p>
          <div className={styles.auth_contentMsg}>
            <p>قبل از آگهی، لطفا وارد حساب خود شوید.</p>
            <p>کد تایید به این شماره پیامک می شود.</p>
          </div>
          <div className={styles.text_field}>
            <p style={error?{color:"red"}:null}>+۹۸</p>
            <input 
            type="text"
            value={mobile} 
            onChange={(e)=>changeHandler(e)}
            placeholder="شماره موبایل" 
            maxLength="11"
            className={valid ? styles.uncomplete :styles.complete }
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
          <p className={styles.conditions} >
            <span>شرایط استفاده</span> و <span>حریم خصوصی</span> دیوار را می
            پذیرم.
          </p>
        </div>
      </div>
      <div className={styles.submitBtn}>
        <button onClick={submitHandler}>تایید</button>
      </div>
    </Modal>
  );
}

export default Register;
