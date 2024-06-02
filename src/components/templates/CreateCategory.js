import React,{useState} from 'react'
import styles from "./CreateCategory.module.css"
import { Divider } from '@mui/material'
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query'
import { addCategory, listCategory } from '../../services/admin'
import Alert from '@mui/material/Alert';
import CategoryList from './CategoryList'
import Loader from '../modules/Loader'

function CreateCategoryPage() {
  const queryClient = useQueryClient()
  const [form, setform] = useState({
    name:"",
    icon:"",
    slug :"",
    parent: undefined
  })
  const {data:categoryList,isLoading} = useQuery({queryKey:["getCategories"],queryFn:listCategory})
  const {mutate,data} = useMutation({mutationFn : addCategory,onSuccess:()=>queryClient.invalidateQueries("getCategories")})
  
  const changeHandler = e => {
   
    const {name, value} = e.target
    setform({
      ...form,
      [name]:value
    })
  }
  const submitHandler = e =>{
    e.preventDefault()
    if(!form.name || !form.slug || !form.icon) return 
    mutate(form)
  }
  if(isLoading) return <Loader />
  return (
    <>
    <CategoryList />
    {data?.status === 201 ? <Alert sx={{display:"flex",justifyContent:"center",direction:"ltr",mx:"20px"}}>دسته با موقفیت ایجاد گردید</Alert>: null}
    {data?.data?.statusCode === 409 ? <Alert severity="error" sx={{display:"flex",justifyContent:"center",direction:"ltr",mx:"20px"}}>اسلاگ یا نام دسته تکراری می باشد</Alert>: null}
    <form onChange={changeHandler} onSubmit={submitHandler} className={styles.form}>
    
        <h3>دسته بندی جدید</h3>
        <Divider sx={{ borderBottomWidth: '4px',borderRadius:"10px",backgroundColor:"#C70039",my:"10px",width:"135px" }} />
        <label htmlFor='name'>نام دسته</label>
        <input type='text' name='name' id='name'/>
        <label htmlFor='slug'>اسلاگ</label>
        <input type='text' name='slug' id='slug' />
        <label htmlFor='icon'>آیکون</label>
        <input type='text' name='icon' id='icon' />
        <label htmlFor='parent'>زیر دسته : </label>
        <select className={styles.selectParent} name='parent' id='parent'>
          <option value={form.parent}>ندارد</option>
          {
            categoryList?.data?.map(item =>(
              item.children.length === 0 ? <option key={item._id} value={item._id} >{item.name}</option> 
              :
              <optgroup label={item.name} key={item._id}>
                <option value={item._id}>{item.name}</option>
              {item.children.map(i => <option key={i._id} value={i._id}>{i.name}</option>)
              }
              </optgroup>
              )
              )
          }
        </select>
        <button type='submit'>ایجاد</button>
    </form>
    </>
  )
}

export default CreateCategoryPage