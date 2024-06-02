import React,{useState} from 'react'
import styles from './Modal.module.css'
import ReactDOM from 'react-dom';
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Modal({title,children}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const clickHandler = ()=>{

      setOpen(!open)
      navigate("/")
    }
  return ReactDOM.createPortal(
    <div className={open ? styles.conatiner : styles.display}>
        <div className={styles.modal}>
            <div className={styles.header}>
                <h1>{title}</h1>
                <button onClick={clickHandler}><MdClose /></button>
            </div>
            {children}
        </div>
    </div>,
    document.getElementById("app-modal")
  )
}

export default Modal