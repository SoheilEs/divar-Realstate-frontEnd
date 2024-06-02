import React, { useEffect, useState } from 'react'
import styles from "./AdsOptions.module.css"
function AdsOptions({options,data,setData}) {
   
    const {type, title ,key, guid, enum:list} = options
    const [option, setOption] = useState({
        [key]:""
    })
    const changeHandler = e =>{
        const {name,value} = e.target
        
        setOption({...option,
            [name]:
            value})
    }
    useEffect(()=>{
        setData({...data, options:{...data.options,[key]:option[key]}})
    },[option])
  return (
    <div className={styles.container}>
        {
        ["number","string"].includes(type) && (
            <div>
                <label htmlFor={key}>{title}</label>
                <input type={type} placeholder={guid} name={key} value={option[key]}  onChange={(e)=>changeHandler(e)}/>
            </div>
            )
        }
        {
            ["boolean","array"].includes(type) &&
            <div>
                <label htmlFor={type}>انتخاب {title}</label>
                <select className={styles.selectParent} name={key}  onChange={(e)=>changeHandler(e)}>
                {list.map((item,index)=><option key={index} value={item}>{item}</option>)}
                </select>
            </div>
        }
    </div>
  )
}

export default AdsOptions