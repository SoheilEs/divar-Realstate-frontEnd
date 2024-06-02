import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import { deleteCategory, listCategory } from '../../services/admin'
import Loader from "../modules/Loader"
import styles from "./CategoryList.module.css"
import { Button, Divider } from '@mui/material'
import { AiOutlineCar } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";
import { CgGames } from "react-icons/cg";
import { BsSmartwatch } from "react-icons/bs";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { RiComputerLine } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { MdOutlineKitchen } from "react-icons/md";
import { Link } from 'react-router-dom'




const ICONS = {
    home:<MdOutlineHomeWork />,
    car : <AiOutlineCar />,
    game:<CgGames />,
    personal: <BsSmartwatch />,
    services : <MdOutlineHomeRepairService />,
    digitals: <HiOutlineDevicePhoneMobile />,
    computer: <RiComputerLine />,
    book:<ImBooks />,
    building:<MdOutlineHomeWork />,
    kitchen:<MdOutlineKitchen />
}



function CategoryList() {
    const queryClient = useQueryClient()
    const {data,isLoading} = useQuery({queryKey:["getCategories"],queryFn:listCategory})
    const { mutate } = useMutation({mutationKey:["deleteCategory"],mutationFn:deleteCategory,onSuccess:()=>queryClient.invalidateQueries("getCategories")})
    const deleteHandler = useCallback((id) => {
        if(!id) return
        mutate(id)
    },[mutate])
    if(isLoading) return <Loader />
    return (
    <>
    <h3 style={{margin:"0px 20px 0px"}}>دسته های ایجاد شده</h3>
    <Divider sx={{ borderBottomWidth: '4px',borderRadius:"10px",backgroundColor:"#C70039",mt:"10px",mr:"20px",mb:"20px",width:"170px" }}  />
    <div className={styles.box}>
        {
            data?.data?.map((item)=>(
                <div className={styles.container} key={item._id}>
                    <h3>{ICONS[item.icon]}{item.name}</h3>
                    <div className={styles.subCategory}>
                        {item.children.map(i=>(
                        <Link key={i._id} to={`${i._id}`}>{i.name}</Link> ))}
                    </div>
                    <Button color='error' variant='contained' sx={{width:"fit-content",fontSize:"0.85rem",padding:"0px",mr:"auto"}} onClick={()=>deleteHandler(item._id)}>حذف</Button>
                </div>
            ))
        }
    </div>
    </>
    )
    }

export default CategoryList