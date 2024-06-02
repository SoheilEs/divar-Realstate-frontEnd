import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteOptionById, listOptionByCategoryId } from "../../services/admin";
import Loader from "./Loader";
import { Alert, Button, Divider } from "@mui/material";
import styles from "./ListOptions.module.css"


export default function ListOptions({ id }) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ["listOpByCategoryId", id],
    queryFn: async ({ queryKey }) => await listOptionByCategoryId(queryKey[1]),
  });
  const { mutate } = useMutation({mutationFn:deleteOptionById,onSuccess:()=>queryClient.invalidateQueries("listOpByCategoryId")})
  const deleteHandler = (optionId) =>{
    mutate(optionId)
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>گزینه های ایجاد شده</h3>
      <Divider sx={{my:"10px" ,backgroundColor:"#be3737",width:"170px"}} />
      {
        isLoading ? (
        <Loader />
      ) : (
        data.data.length === 0 ? <Alert severity="error" sx={{display:"flex",justifyContent:"center",direction:"ltr",mt:"30px"}}>هیچ گزینه ای برای این دسته ایجاد نشده است</Alert>
:        data?.data?.map((item) => (
          <div className={styles.opListContainer} key={item._id}>
            <h4>عنوان : {item.title}</h4>
            <p>کلمه کلیدی : {item.key}</p>
            <p>نوع فیلد : {item.type}</p>
            <span>الزامی : {item.required ? "بله":"خیر"}</span>
            <Button variant="outlined" color="error" sx={{mr:"5px"}} onClick={()=>deleteHandler(item._id)}>حذف</Button>
          </div>
        ))
      )}
    </div>
  );
}
