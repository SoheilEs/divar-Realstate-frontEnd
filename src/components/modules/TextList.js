import React from "react";
import { Button } from "@mui/material";
import styles from "./TextList.module.css";

function TextList({ name, allOptions, options, setOptions }) {
  const addHandler = () => {
    options.enum = [...options.enum, ""];
    setOptions([...allOptions]);
  };
  const changeHandler = (e,id)=>{
    const {value} = e.target
    options.enum[id] = value
    setOptions([...allOptions])
   
   
  }
  const deleteHandler = (id) => {
    options.enum.splice(id, 1);
    setOptions([...allOptions]);
  };
  return (
    <div className={styles.container}>
      {options.enum.map((item, index) => (
        <div className={styles.input} key={index}>
          <div>
            <label htmlFor="enum">
              {name === "array" ? "ایتم لیست را وارد کنید : " : null}
              {name === "boolean" ? "گزینه ها را وارد کنید : " : null}
            </label>
            <input value={item} name="enum" onChange={(e)=>changeHandler(e,index)} />
          </div>
          <Button variant="outlined" color="error" sx={{mr:"10px"}} onClick={() => deleteHandler(index)}>حذف</Button>
        </div>
      ))}
      <Button variant="outlined" sx={{my:"10px"}} onClick={addHandler}>
        {name === "array" ? "اضافه لیست" : null}
        {name === "boolean" ? "اضافه گزینه" : null}
      </Button>
    </div>
  );
}

export default TextList;
