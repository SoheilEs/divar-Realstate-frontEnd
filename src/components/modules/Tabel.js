import React from 'react'
import styles from "./Tabel.module.css"
import { Link } from 'react-router-dom'

function Tabel({title,fields}) {
  return (
        <table className={styles.tabel}>
            <thead>
              <tr>
                {fields?.map((field,index)=><th key={index}>{field}</th>)}
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>12232312</td>
                  <td>12232312</td>
                  <td>۱۴۰۲/۰۳/۰۳</td>
                  <td>ادمین</td>
                  <td>بله</td>
                  <td>
                   <Link>ویرایش</Link>
                   <button>حذف</button>
                  </td>
                </tr>
            </tbody>
    </table>
  )
}

export default Tabel